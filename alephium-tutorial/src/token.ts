import { Deployments } from '@alephium/cli'
import { web3, CallContractParams, MINIMAL_CONTRACT_DEPOSIT } from '@alephium/web3'
import { testNodeWallet } from '@alephium/web3-test'
import configuration from '../alephium.config'
import { Donations } from '../artifacts/ts'

async function withdraw() {
  const signer = await testNodeWallet()
  const addresses = await signer.getAccounts()
  const address = addresses[0]

  web3.setCurrentNodeProvider('http://127.0.0.1:22973')

  const deployments = await Deployments.load(configuration, 'devnet')

  const params: CallContractParams<{ donor: string }> = {
    args: { donor: address.address }
  }

  const contract = deployments.getInstance(Donations, address.group)

  // deposit to the user
  await contract?.transact.depositToUser({
    args: {
      recipient: address.address,
      amount: 1n
    },
    signer: signer,
    attoAlphAmount: MINIMAL_CONTRACT_DEPOSIT // APS, need to approve the amount for the map
  })

  // check the donation
  const getDonationBal = await contract?.view.getDonorTotal(params)
  console.log(getDonationBal?.returns)
}

withdraw()
