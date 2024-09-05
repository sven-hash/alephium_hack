import { web3, CallContractParams } from '@alephium/web3'
import { testNodeWallet } from '@alephium/web3-test'
import { Donations } from './alephium-tutorial/artifacts/ts'

async function donateFund() {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  const signer = await testNodeWallet()
  const addresses = await signer.getAccounts()

  const contract = Donations.at('wPcvVsWF5o8JgiZZE3YE2JRC1jN1r5gPZ5fxBveyA6go')

  const params: CallContractParams<{ donor: string }> = {
    args: { donor: addresses[1].address }
  };

  console.log(contract.address);
  const getDonationBal = await contract.view.getDonorTotal(params);
  console.log(getDonationBal.returns)
}

donateFund()