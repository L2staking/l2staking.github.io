import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import { gluonABI } from './ABI/Gluon'
import { stakingABI } from './ABI/Staking'
import { ERC20TransferABI } from './ABI/ERC20Transfer'
import './App.css'
import Logo from './assets/leverj.svg';
import TextField from '@material-ui/core/TextField';
import ContentLoader from "react-content-loader"
import Countdown from 'react-countdown';
import BigNumber from "bignumber.js";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#1c1e33"
    foregroundColor="#2c2e43"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
  </ContentLoader>
)

const StakingResult = ({ deltaTime, userWorth, intervalWorth, quantityStaked, intervalRewardUSDT, intervalRewardDAI }) => {
  const decimals = new BigNumber(10).exponentiatedBy(18)
  const decimals6 = new BigNumber(10).exponentiatedBy(6)
  const userWorthUnit = new BigNumber(userWorth).dividedBy(decimals)
  const intervalWorthUnit = new BigNumber(intervalWorth).dividedBy(decimals)
  const quantityStakedUnit = new BigNumber(quantityStaked).dividedBy(decimals)
  const userPercentage = new BigNumber(userWorthUnit).dividedBy(intervalWorthUnit).precision(4)
  const userPercentageUnit = new BigNumber(userPercentage).multipliedBy(100)
  const intervalRewardUSDTUnit = new BigNumber(intervalRewardUSDT).dividedBy(decimals6)
  const intervalRewardDAIUnit = new BigNumber(intervalRewardDAI).dividedBy(decimals)
  const userRewardUSDTUnit = new BigNumber(intervalRewardUSDTUnit).multipliedBy(userPercentage)
  const userRewardDAIUnit = new BigNumber(intervalRewardDAIUnit).multipliedBy(userPercentage)

  return (
    <div className="StakingResult-root">
      <div className="StakingResult-line">
        - Staked Amount : {parseFloat(quantityStakedUnit)} L2
      </div>
      <div className="StakingResult-line">
        - Countdown before reward : <Countdown date={Date.now() + (deltaTime * 1000)} />
      </div>
      <div className="StakingResult-line">
        - Interval Rewards : {parseFloat(intervalRewardUSDTUnit).toFixed(2)} USDT & {parseFloat(intervalRewardDAIUnit).toFixed(2)} DAI
      </div>
      <div className="StakingResult-line">
        - Share Percentage : {parseFloat(userPercentageUnit).toFixed(2)}%
      </div>
      <div className="StakingResult-line">
        - Share Rewards : {parseFloat(userRewardUSDTUnit).toFixed(2)} USDT & {parseFloat(userRewardDAIUnit).toFixed(2)} DAI
      </div>
    </div>
  )
}

function App () {

  const [quantityStaked, setQuantityStaked] = useState(null)
  const [userWorth, setUserWorth] = useState(null)
  const [intervalWorth, setIntervalWorth] = useState(null)
  const [userAddress, setUserAddress] = useState(null)
  const [stakingContract, setStakingContract] = useState(null)
  const [stakingAddress, setStakingAddress] = useState(null)
  const [deltaTime, setDeltaTime] = useState(null)
  const [userAddressError, setUserAddressError] = useState(false)
  const [userAddressErrorReason, setUserAddressErrorReason] = useState(null)
  const [intervalRewardUSDT, setIntervalRewardUSDT] = useState(null)
  const [intervalRewardDAI, setIntervalRewardDAI] = useState(null)
  const AVERAGE_ETH_BLOCK_TIME_SECONDS = 13
  const STAKING_APP_ID = 1
  const INVALID_INTERVAL_INDEX = 0
  const REWARD_INDEX_USDT = 2
  const REWARD_INDEX_DAI = 1
  const web3 = new Web3('https://mainnet.infura.io/v3/211ccd9759dd4ab09c07f884b0712f9c');
  const gluonContractAddress = '0x75ACe7a086eA0FB1a79e43Cc6331Ad053d8C67cB';
  const GluonContract = new web3.eth.Contract(gluonABI, gluonContractAddress);
  const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
  const DAIContract = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS);
  const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';
  const USDTContract = new web3.eth.Contract(ERC20TransferABI, USDT_ADDRESS);
  const validUserAddress = userAddress && web3.utils.isAddress(userAddress)
  const resultLoading = validUserAddress && !userAddressError && !deltaTime
  const resultReady = validUserAddress && !userAddressError && deltaTime

  useEffect(() => {
    GluonContract.methods.app(STAKING_APP_ID).call().then(({ current }) => {
      setStakingAddress(current)
      const stakingContract = new web3.eth.Contract(stakingABI, current);
      setStakingContract(stakingContract)
    })
  }, [])

  useEffect(() => {
    if (validUserAddress) {
      stakingContract.methods.stakes(userAddress).call().then(({ intervalIndex, worth, quantity }) => {
        if (parseInt(intervalIndex) === INVALID_INTERVAL_INDEX) {
          setUserAddressError(true)
          setUserAddressErrorReason("This address doesn't seem to have any L2 staked")
          return
        }
        setQuantityStaked(quantity)
        setUserWorth(worth)
        stakingContract.methods.intervals(intervalIndex).call().then(({ worth, start, end }) => {
          setIntervalWorth(worth)
          web3.eth.getBlockNumber().then(curHeight => {
            const deltaHeight = end - curHeight
            const deltaTime = (deltaHeight * AVERAGE_ETH_BLOCK_TIME_SECONDS)
            setDeltaTime(deltaTime)
            console.log("deltaTime=", deltaTime)
            });
          });
        })
      DAIContract.methods.balanceOf(stakingAddress).call(function (err, res) {
        if (err) {
          console.log("An error occured retrieving DAI Rewards balance", err)
          return
        }
        console.log("DAI Rewards: ", res)
        setIntervalRewardDAI(res)
      });
      USDTContract.methods.balanceOf(stakingAddress).call(function (err, res) {
        if (err) {
          console.log("An error occured retrieving USDT Rewards balance", err)
          return
        }
        console.log("USDT Rewards: ", res)
        setIntervalRewardUSDT(res)
      });
    }
  }, [userAddress])

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <img src={Logo} />
        </div>
        <div className="App-header-text">
          LeverJ Staking Information
        </div>
      </header>
      <div className="App-content">
        <div className="App-content-address">
          <TextField
            focused
            id="L2/ETH Public Address"
            label="L2/ETH Public Address"
            variant="outlined"
            size="small"
            type="text"
            margin="dense"
            onChange={(e) => {
              setUserAddressErrorReason(null)
              setUserAddressError(false)
              setUserAddress(e.target.value)
            }}
            value={userAddress}
            required={true}
            error={userAddressError}
            fullWidth
            inputProps={{
              style: { fontSize: 'calc(5px + 1vw)' }
            }}
          />
        </div>
        <div className="App-content-result">
          {<div className="App-content-error">{userAddressErrorReason}</div>}
          {resultLoading &&
            <Loader />}
          {resultReady &&
            <StakingResult
              deltaTime={deltaTime}
              userWorth={userWorth}
              intervalWorth={intervalWorth}
              quantityStaked={quantityStaked}
              intervalRewardUSDT={intervalRewardUSDT}
              intervalRewardDAI={intervalRewardDAI}
            />}
        </div>
      </div>
    </div>
  );
}

export default App;
