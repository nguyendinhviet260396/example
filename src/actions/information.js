import * as inforApis from './../apis/infomation';

export const fetchListInfor = () => {
    return dispatch => {
        inforApis
            .getList()
            .then(data => {
                //console.log('data:', data);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

