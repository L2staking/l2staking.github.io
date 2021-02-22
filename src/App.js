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
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

function numberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

const StakingResult = ({ userWorth, intervalWorth, quantityStaked, intervalRewardUSDT, intervalRewardDAI }) => {
  const decimals = new BigNumber(10).exponentiatedBy(18)
  const decimals6 = new BigNumber(10).exponentiatedBy(6)
  const userWorthUnit = new BigNumber(userWorth)
  const intervalWorthUnit = new BigNumber(intervalWorth)
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
        Staked Amount : {parseFloat(quantityStakedUnit)} L2
      </div>
      <div className="StakingResult-line">
        Share Percentage : {parseFloat(userPercentageUnit).toFixed(3)}%
      </div>
      <div className="StakingResult-line">
        Share Rewards : {parseFloat(userRewardUSDTUnit).toFixed(2)} USDT & {parseFloat(userRewardDAIUnit).toFixed(2)} DAI
      </div>
    </div>
  )
}

const GlobalStats = ({ deltaTime, totalStakedL2, intervalRewardUSDT, intervalRewardDAI }) => {

  const decimals = new BigNumber(10).exponentiatedBy(18)
  const decimals6 = new BigNumber(10).exponentiatedBy(6)
  const totalStakedL2Unit = new BigNumber(totalStakedL2).dividedBy(decimals)
  const intervalRewardUSDTUnit = new BigNumber(intervalRewardUSDT).dividedBy(decimals6)
  const intervalRewardDAIUnit = new BigNumber(intervalRewardDAI).dividedBy(decimals)

  return (
    <div className="GlobalStats-root">
      <div className="GlobalStats-line">
        Countdown before reward : <Countdown date={Date.now() + (deltaTime * 1000)} />
      </div>
      <div className="GlobalStats-line">
        Total staked amount : {numberWithCommas(parseFloat(totalStakedL2Unit).toFixed(0))} L2
      </div>
      <div className="GlobalStats-line">
        Current interval rewards : {parseFloat(intervalRewardUSDTUnit).toFixed(2)} USDT & {parseFloat(intervalRewardDAIUnit).toFixed(2)} DAI
      </div>
    </div>
  )
}

const Calculator = ({ calculatorL2Amount, totalStakedL2, intervalRewardUSDT, intervalRewardDAI }) => {

  const decimals = new BigNumber(10).exponentiatedBy(18)
  const decimals6 = new BigNumber(10).exponentiatedBy(6)

  const calculatorL2AmountUnit = new BigNumber(calculatorL2Amount).multipliedBy(decimals)
  const totalStakedL2Unit = new BigNumber(totalStakedL2)
  const userPercentage = new BigNumber(calculatorL2AmountUnit).dividedBy(totalStakedL2Unit).precision(4)
  const userPercentageUnit = new BigNumber(userPercentage).multipliedBy(100)
  const intervalRewardUSDTUnit = new BigNumber(intervalRewardUSDT).dividedBy(decimals6)
  const intervalRewardDAIUnit = new BigNumber(intervalRewardDAI).dividedBy(decimals)
  const userRewardUSDTUnit = new BigNumber(intervalRewardUSDTUnit).multipliedBy(userPercentage)
  const userRewardDAIUnit = new BigNumber(intervalRewardDAIUnit).multipliedBy(userPercentage)

  return (
    <div className="Calculator-root">
      <div className="Calculator-line">
        Share Percentage : {parseFloat(userPercentageUnit)}%
      </div>
      <div className="Calculator-line">
        Share Rewards : {parseFloat(userRewardUSDTUnit).toFixed(2)} USDT & {parseFloat(userRewardDAIUnit).toFixed(2)} DAI
      </div>
    </div>
  )
}

function App () {

  // React states
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
  const [totalStakedL2, setTotalStakedL2] = useState(null)
  const [calculatorL2Amount, setCalculatorL2Amount] = useState(null)

  // Constants
  const AVERAGE_ETH_BLOCK_TIME_SECONDS = 13
  const STAKING_APP_ID = 1
  const INVALID_INTERVAL_INDEX = 0
  const gluonContractAddress = '0x75ACe7a086eA0FB1a79e43Cc6331Ad053d8C67cB';
  const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
  const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';
  const L2_ADDRESS = '0xbbff34e47e559ef680067a6b1c980639eeb64d24';

  // Web3 Contracts
  const web3 = new Web3('https://mainnet.infura.io/v3/211ccd9759dd4ab09c07f884b0712f9c');
  const GluonContract = new web3.eth.Contract(gluonABI, gluonContractAddress);
  const DAIContract = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS);
  const USDTContract = new web3.eth.Contract(ERC20TransferABI, USDT_ADDRESS);

  // App states
  const validUserAddress = userAddress && web3.utils.isAddress(userAddress)
  const resultLoading = validUserAddress && !userAddressError && !quantityStaked && !userWorth
  const resultReady = validUserAddress && !userAddressError && quantityStaked && userWorth
  const globalStatsReady = totalStakedL2 && deltaTime && intervalRewardUSDT && intervalRewardDAI
  const calculatorReady = calculatorL2Amount

  // Gluon Queries
  useEffect(() => {
    GluonContract.methods.app(STAKING_APP_ID).call().then(({ current }) => {
      setStakingAddress(current)
      const stakingContract = new web3.eth.Contract(stakingABI, current);
      setStakingContract(stakingContract)
    })
    GluonContract.methods.getBalance(STAKING_APP_ID, L2_ADDRESS).call().then(result => {
      setTotalStakedL2(result)
    })
  }, [])

  // DAIContract Queries
  useEffect(() => {
    if (stakingAddress) {
      DAIContract.methods.balanceOf(stakingAddress).call(function (err, res) {
        if (err) {
          console.error("An error occured retrieving DAI Rewards balance", err)
          return
        }
        setIntervalRewardDAI(res)
      });
    }
  }, [stakingAddress])

  // USDTContract Queries
  useEffect(() => {
    if (stakingAddress) {
      USDTContract.methods.balanceOf(stakingAddress).call(function (err, res) {
        if (err) {
          console.error("An error occured retrieving USDT Rewards balance", err)
          return
        }
        setIntervalRewardUSDT(res)
      });
    }
  }, [stakingAddress])

  // StakeLogic Queries
  useEffect(() => {
    if (stakingContract) {

      stakingContract.methods.currentIntervalIndex().call().then(intervalIndex => {
        stakingContract.methods.getInterval(intervalIndex).call().then(({ worth, rewards, start, end }) => {
          setIntervalWorth(worth)
          web3.eth.getBlockNumber().then(curHeight => {
            const deltaHeight = end - curHeight
            const deltaTime = (deltaHeight * AVERAGE_ETH_BLOCK_TIME_SECONDS)
            setDeltaTime(deltaTime)
          });
        })
      })

      // User address field
      if (validUserAddress) {
        stakingContract.methods.stakes(userAddress).call().then(({ intervalIndex, worth, quantity }) => {
          if (parseInt(intervalIndex) === INVALID_INTERVAL_INDEX) {
            setUserAddressError(true)
            setUserAddressErrorReason("This address doesn't seem to have any L2 staked")
            return
          }
          setQuantityStaked(quantity)
          setUserWorth(worth)
        })
      }
    }
  }, [userAddress, stakingContract])

  return (
    <div className="App-root">

      <header className="App-header">
        <div className="App-logo">
          <img src={Logo} />
        </div>
        <div className="App-header-text">
          Leverj Staking Information
        </div>
      </header>


      <div className="App-content">

        <hr style={{ width: '30vw', marginTop: '30px' }} />

        {/* GlobalStats */}
        <div className="App-content-global">
          <div className="App-content-header">
            <EqualizerIcon /> Global Stats
          </div>
          <div className="App-content-description">
            Top level stats about total staked L2 are displayed below.
          </div>

          {globalStatsReady &&
            <GlobalStats
              deltaTime={deltaTime}
              totalStakedL2={totalStakedL2}
              intervalRewardUSDT={intervalRewardUSDT}
              intervalRewardDAI={intervalRewardDAI}
            />}
        </div>

        <hr style={{ width: '30vw', marginTop: '30px' }} />

        {/* UserInfo */}
        <div className="App-content-userinfo">
          <div className="App-content-header">
            <AccountBalanceWalletIcon /> Calculate your stake
          </div>
          <div className="App-content-description">
            Input your ETH address where you stake your L2 in the field below.
          </div>

          <div className={"App-content-userinfo-textfield"}>
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
              value={userAddress || ''}
              required={true}
              error={userAddressError}
              fullWidth
              inputProps={{
                style: { fontSize: 'calc(5px + 1vw)' }
              }}
            />

            {<div className="App-content-userinfo-error">{userAddressErrorReason}</div>}
          </div>

          {resultLoading &&
            <Loader />}
          {resultReady &&
            <StakingResult
              userWorth={userWorth}
              intervalWorth={intervalWorth}
              quantityStaked={quantityStaked}
              intervalRewardUSDT={intervalRewardUSDT}
              intervalRewardDAI={intervalRewardDAI}
            />}
        </div>

        <hr style={{ width: '30vw', marginTop: '30px' }} />

        {/* Calculator */}
        <div className="App-content-calculator">
          <div className="App-content-header">
            <MonetizationOnIcon /> Simulator
          </div>
          <div className="App-content-description">
            Input any amount of L2 and the calculator will display an
            <br />
            estimation of the rewards you'll receive during the next term.
          </div>

          <div className={"App-content-calculator-textfield"}>
            <TextField
              focused
              id="L2 Amount"
              label="L2 Amount"
              variant="outlined"
              size="small"
              type="text"
              margin="dense"
              onChange={(e) => {
                setCalculatorL2Amount(e.target.value)
              }}
              value={calculatorL2Amount || ''}
              required={true}
              fullWidth

              inputProps={{
                style: { fontSize: 'calc(5px + 1vw)' }
              }}
            />
          </div>

          {calculatorReady &&
            <Calculator
              calculatorL2Amount={calculatorL2Amount}
              totalStakedL2={totalStakedL2}
              intervalRewardUSDT={intervalRewardUSDT}
              intervalRewardDAI={intervalRewardDAI}
            />
          }

        </div>

      </div>
    </div>
  );
}

export default App;
