// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// import "eth-alarm-clock/contracts/ETHAlarmClock.sol";

contract Moderation {

    struct Voter {
        bool voted;
        bool vote;
        // uint256 timestamp;
    }

    mapping(address => Voter) public voters;
    // mapping(address => uint256) public previouslyVoted;
    uint256 public voterCount=0;
    uint256 public trueCount=0;
    uint256 public falseCount=0;
    // uint256 public startTime;
    // uint256 public prevTimestamp;
    address[] public voterList;
    bool public majority;
    uint i;

    modifier hasNotVoted() {
        require(!voters[msg.sender].voted, "You have already voted!");
        _;
    }

    function voterModeration(bool _vote) public payable hasNotVoted returns (string memory) {
        require(msg.value >= 0.000001 ether, "Please send at least 0.000001 ether to vote.");
        // if(previouslyVoted[msg.sender]==prevTimestamp && prevTimestamp!=0)
        // {
        //     return "Voter has voted on the previous occasion.";
        // }
        // else 
        // {
            // if(voterCount==0)
            // {
            //     startTime = block.timestamp;
            // }
            Voter memory newVote=Voter(true,_vote);
            voters[msg.sender]=newVote;
            // voters[msg.sender].voted = true;
            // voters[msg.sender].vote = _vote;
            // previouslyVoted[msg.sender] = startTime;
            voterCount++;
            voterList.push(msg.sender);
            if(_vote==true)
            {
                trueCount++;
            }
            else if(_vote==false)
            {
                falseCount++;
            }
            return "Vote counted successfully!";
        // }
    }

    function finalize() public view returns (bool) {
        bool majorityVote;
        majorityVote = trueCount>=falseCount;
        return majorityVote;
    }

    function payUser(bool _result) public {
        uint256 stakeShare;
        uint256 totalStake=address(this).balance;
        if(_result == true) {
            stakeShare=totalStake/trueCount;
        }

        else if(_result == false) {
            stakeShare=totalStake/falseCount;
        }

        for (i=0;i<voterCount;i++) {
            if(voters[voterList[i]].vote==_result)
            {
                payable(voterList[i]).transfer(stakeShare-0.000001 ether);
            }
        }
    }

    function reset() public {
        for (i = 0; i < voterList.length; i++) {
            delete voters[voterList[i]];
        }

        delete voterList;
        voterCount=0;
        trueCount=0;
        falseCount=0;
        // prevTimestamp=startTime;
    }
}

