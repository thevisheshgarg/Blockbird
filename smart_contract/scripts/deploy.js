const main = async () => {
  // const profileImageFactory = await hre.ethers.getContractFactory(
  //   'ProfileImageNfts',
  // )
  const contentModeration = await hre.ethers.getContractFactory(
    'Moderation',
  )
  // const profileImageContract = await profileImageFactory.deploy()
  const contentModerationContract = await contentModeration.deploy()

  await contentModerationContract.deployed()

  console.log('Profile Image Minter deployed to:', contentModerationContract.address)
}

;(async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
