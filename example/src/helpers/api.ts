import axios, { AxiosInstance } from 'axios'
import { IAssetData, IGasPrices, IParsedTx } from './types'

const api: AxiosInstance = axios.create({
  baseURL: 'https://backend.bpntoken.com/',
  timeout: 30000, // 30 secs
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})



export async function apiGetWithdrawls(
  address: string,
  chainId: number
): Promise<IAssetData[]> {
  const response = await api.get(
    `/withdrawl-list?address=${address}`
  )
  console.log(response)
  const result = response.data
  return result
}

export async function apiGetLevelIncome(
  address: string,
  option: number
): Promise<IAssetData[]> {
  const response = await api.get(
   `/filter-income-detail?address=${address}&&type=${option}`
  )
  const result = response.data
  return result
}

export async function getRefferal(
  address: string
): Promise<IAssetData[]> {
  const response = await api.get(
    `/user-profile?address=${address}`
  )
  const  result  = response.data
  return result
}


export async function apiGetAccountAssets(
  address: string,
  chainId: number
): Promise<IAssetData[]> {
  const response = await api.get(
    `/account-assets?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export async function apiGetAccountTransactions(
  address: string,
  chainId: number
): Promise<IParsedTx[]> {
  const response = await api.get(
    `/account-transactions?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export const apiGetAccountNonce = async (
  address: string,
  chainId: number
): Promise<string> => {
  const response = await api.get(
    `/account-nonce?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export const apiGetGasPrices = async (): Promise<IGasPrices> => {
  const response = await api.get(`/gas-prices`)
  const { result } = response.data
  return result
}
export const getAxios= async (url:string, data:any) =>{
  let urlData = Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    const response = await api.get(`/${url}?${urlData}`)
    return response
}
export const postAxios= async (url:string, data:any, method:string) =>{
    const response = await api.post(`/${url}`, data)
    return response
}
export const getFetch = async (apiUrl:string, data:any, method:string) =>{
    let url = Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    url = apiUrl+'?'+url
      const response = await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
    
    

  console.log("helpers/api.ts/73", await response.json())
  return response 

}