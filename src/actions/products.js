import * as productsApis from './../apis/products';

export const fetchListProducts = () => {
    return dispatch => {
        productsApis
            .getList()
            .then(data => {
                //console.log('data:', data);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

