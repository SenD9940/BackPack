import axios from "axios";

//공공데이터 포털

async function searchAddress(value){
    const url = `https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do?resultType=json&keyword=${value}&confmKey=${process.env.REACT_APP_ADDRESS_KEY}`;
    const address = await axios.post(url).then(res =>{
        let data = res.data.replace("(", "");
        data = data.substring(0, data.length - 1);
        data = JSON.parse(data);
        const juso = data.results.juso;
        let addr = [];
        if(juso){
            for(var i = 0; i < juso.length; i++){
                addr.push(juso[i].roadAddr);   
            }
        }
        return addr;
    }).catch(err => {
        console.log(err);
    })
    return address;
}

async function searchBusinessNo(value){
    const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.REACT_APP_BUSINESS_KEY}`
    const result = await axios.post(url, {
        b_no:[value]
    }).then(res => {
        return res.data.data[0].tax_type;
    }).catch(err => {
        console.log(err);
    });
    return result;
}

export {searchAddress, searchBusinessNo};