import start from '../src';
import RouteServiceProvider from './app/providers/RouterProvider';
import axios from 'axios';

start(3000, RouteServiceProvider, [], () => {
    Promise.all([checkIndex(), checkNotFound(), checkServerError()]).then(res => {
        res.forEach((el, i) => {
            console.log(`Test ${i + 1} success: ${el}`);
        })
    })
});

function checkIndex() {
    return new Promise(resolve => {
        axios.get('http://127.0.0.1:3000').then(() => {
            resolve(true);
        }).catch(() => {
            resolve(false);
        })
    });
}

function checkNotFound() {
    return new Promise(resolve => {
        axios.get('http://127.0.0.1:3000/dsgfsd').then(() => {
            resolve(false);
        }).catch(e => {
            if (e.response && e.response.status === 404) {
                resolve(true);
            } else {
                resolve(false)
            }
        })
    });
}

function checkServerError() {
    return new Promise(resolve => {
        axios.get('http://127.0.0.1:3000/error').then(() => {
            resolve(false);
        }).catch(e => {
            if (e.response && e.response.status === 500) {
                resolve(true);
            } else {
                resolve(false)
            }
        })
    });
}
