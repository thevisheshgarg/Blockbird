import ProfileImageMinterContractAbi from './ProfileImageNfts.json'
import contentModerationContractAbi from './contentModeration.json'

export const contractABI = ProfileImageMinterContractAbi.abi
export const contractAddress = '0xd18F2F28780B60b81E27382484aE1A739a7626b2'

export const moderationABI = contentModerationContractAbi.abi
export const moderationAddress = '0xBe8278dA7b0eeB8bBfB5757714e067F6F4f7081B'

export const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: '#334250a7',
  },
}
