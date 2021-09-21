import { BPN_CONTRACT } from '../constants'

//==================  utility functions ====================

export async function createSna(address:any, chainId:any, web3:any){
 // let secret = await dispatchCall(address, chainId, web3,  'getSecret', []) 
  let secret,  nonce = "";
  // let nonce = await  dispatchCall(address, chainId, web3, 'addressNonce', [address])
  return secret+nonce+address
  }

  export async function dispatchWithdraw(address: string, chainId: number, web3: any, funcString:any, args:Array<any>, value:any) {
    console.log("heres chainId", chainId)
  let hoverx = getbpnContract(chainId, web3)
  // let fn = (typeof funcString == "function") ? funcString : hoverx.methods[funcString];  // Allow fn to be a function object or the name of a global function
  // fn =  fn.apply(null, args || []);  // args is optional, use an empty array by default
  // let result= await fn.send({from:address, gasPrice:210000, value})
  console.log("hoverx ...", args)
  let result =  await hoverx.methods.withDraw(...args).send({from:address, value})
  console.log("args ...", result)
  return result
  }


//================== FACTORY FUNCTIONS //==================
export function getbpnContract(chainId: number, web3: any) {
  console.log("chainid", chainId)
  const dai = new web3.eth.Contract(
    BPN_CONTRACT[chainId].abi,
    BPN_CONTRACT[chainId].address
  )
  return dai
}
export async function dispatchCall(address: string, chainId: number, web3: any, funcString:any, args:Array<any>) {
  let bpn = getbpnContract(chainId, web3)
  let fn = (typeof funcString == "function") ? funcString : bpn.methods[funcString];  // Allow fn to be a function object or the name of a global function
  fn =  fn.apply(null, args || []);  // args is optional, use an empty array by default
   let result=  await fn.call({from:address, gasPrice:210000});

  return result
}

export async function propertyCall(address: string, chainId: number, web3: any, propertyString:any, args:Array<any>) {
  let bpn = getbpnContract(chainId, web3)
  console.log("is bpn activated", bpn) 
   // args is optional, use an empty array by default
  let result= await bpn[propertyString].call({from:address, gasPrice:210000})
  return result
}


export async function dispatchSend(address: string, chainId: number, web3: any, funcString:any, args:Array<any>, value:any) {
    console.log("heres chainId", chainId)
  let bpn = getbpnContract(chainId, web3)
  // let fn = (typeof funcString == "function") ? funcString : bpn.methods[funcString];  // Allow fn to be a function object or the name of a global function
  // fn =  fn.apply(null, args || []);  // args is optional, use an empty array by default
  // let result= await fn.send({from:address, gasPrice:210000, value})
  // return result
  console.log("args ...", ...args)
  let result =  await bpn.methods.buy(...args).send({from:address, value})
  console.log("args ...", result)
  return result
}


//================== FACTORY FUNCTION ENDS



// //==================still unused functions ==================

async function getBpnPrice(address:any, chainId:any, web3:any){
  let BpnPrice = await  propertyCall(address, chainId, web3, 'currentPrice_', [] )
  return BpnPrice
}



export function callBalanceOf(address: string, chainId: number, web3: any) {
  return new Promise(async(resolve, reject) => {
    const bpn = getbpnContract(chainId, web3)
    console.log("bpn.ts/23")

    await bpn.methods
      .balanceOf(address)
      .call(
        { from: address },
        (err: any, data: any) => {
          if (err) {
            console.log("bpn.ts/23",err)

            reject(err)
          }
          console.log("bpn.ts/23",data)
          
          resolve(data)
        }
      )
  })
}

export function callTransfer(address: string, chainId: number, web3: any) {
  return new Promise(async(resolve, reject) => {
    const dai = getbpnContract(chainId, web3)

    await dai.methods
      .transfer(address, '1')
      .send({ from: address }, (err: any, data: any) => {
        if (err) {
          reject(err)
        }

        resolve(data)
      })
  })
}