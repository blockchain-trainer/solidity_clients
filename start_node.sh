#!/bin/bash
# This is a standard script to launch a geth node private chain of the domain of your choice
echo "Staring Your "$1"Chain...";	# We are a go
touch $1Chain.json			# create Genesis file
mkdir $1ChainData
./geth --datadir $1ChainData account new

for entry in "$1ChainData"/keystore/*
do
  echo "$entry"
  A=$(echo $entry | awk -F'[-][-]' '{print $3}') #get the account after reading the key file	
done
#create the genesis file - DomainChain.json 
echo "{

    \"config\":{
        \"chainId\":$2,
        \"homesteadBlock\":0,
        \"eip150Block\":0,
        \"eip155Block\":0,
        \"eip158Block\":0
    },
    \"difficulty\":\"200000\",
    \"gasLimit\":\"2100000000\",
    \"alloc\":{
       \"$A\":{
           \"balance\":\"$3\"
        }
    }

}" > $1Chain.json	
#create the genesis block
./geth --datadir $1ChainData init $1Chain.json
#start your chain
./geth --datadir $1ChainData --networkid $2 --nodiscover console --rpc --rpcport "8000" --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcapi "eth,net,web3,miner,debug,personal,rpc" --mine 1 --miner.etherbase=$A
