import { readFireStore} from "../server/firebase";
import axios from "axios";

//사업자번호 유효성 검사 (국세청에 등록되어 있는지)
async function businessValidationCheck(value) {
    const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_BUSINESS_KEY}`
    const result = await axios.post(url, {
        b_no:[value]
    }).then(res => {
        if(res.data.data[0].tax_type !== '국세청에 등록되지 않은 사업자등록번호입니다.'){
            return true;
        }else{
            return false;
        }
    }).catch(err => {
        console.log(err);
    });
    return result;
}

//파이어베이스 필드 데이터 중복 검사
async function firestoreDataDuplicatedValidationCheck(value, table, field){
    const query = {var_name:field, operator:"==", data:value};
    const result = await readFireStore(table, query).then(res => {
        if(res._snapshot.docChanges.length === 0){
            return true;
        }else{
            return 'duplicated';
        }
    }).catch(err => {
        console.log(err);
    });
    return result;
}

function lengthValidationCheck(value, length){
    if(value.length > length){
        return true;
    }
    return false;
}

//리스트 내용이 선택되었는지 검사
function listDataSelectedValidationCheck(value, compare_list){
    if(lengthValidationCheck(value, 0)){
        for(const data of compare_list){
            if(data === value){
                return true;
            }
        }
    }
    return false;
}
export {businessValidationCheck, firestoreDataDuplicatedValidationCheck, lengthValidationCheck, listDataSelectedValidationCheck};