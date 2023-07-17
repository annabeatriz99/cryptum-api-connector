import { OmitType } from '@nestjs/swagger';
import { CreateSmartContractDeployTransactionDto } from './smartcontract-transaction.dto';
import { EthTokenType } from './transaction.dto';
import { TransactionType } from 'cryptum-sdk/dist/src/features/transaction/entity';

export class CreateEthTokenDeployTransactionDto extends OmitType(CreateSmartContractDeployTransactionDto, [
  'source',
  'contractName',
]) {
  tokenType: EthTokenType;
  params: string[] = [];
}

export class CreateHathorTokenDeployTransaction extends OmitType(CreateEthTokenDeployTransactionDto, [
  'fee',
  'feeCurrency',
  'params',
  'tokenType',
  'protocol',
]) {
  address: string;
  tokenName: string;
  tokenSymbol: string;
  amount: string;
  mintAuthorityAddress?: string;
  meltAuthorityAddress?: string;
}

export class CreateHathorMintTokenTransaction extends OmitType(CreateHathorTokenDeployTransaction, [
  'tokenName',
  'tokenSymbol',
  'meltAuthorityAddress',
]) {
  changeAddress: string;
  tokenUid: string;
  mintAuthorityAddress?: string;
}

export class CreateHathorMeltTokenTransaction extends OmitType(CreateHathorTokenDeployTransaction, [
  'tokenName',
  'tokenSymbol',
  'mintAuthorityAddress',
]) {
  changeAddress: string;
  tokenUid: string;
  meltAuthorityAddress?: string;
}

export class CreateSolanaTokenDeployTransaction extends OmitType(CreateEthTokenDeployTransactionDto, [
  'fee',
  'feeCurrency',
  'params',
  'tokenType',
  'protocol',
]) {
  tokenName: string;
  tokenSymbol: string;
  amount: string;
  fixedSupply: boolean;
  decimals: number;
}

export class CreateSolanaTokenMintTransaction extends OmitType(CreateEthTokenDeployTransactionDto, [
  'fee',
  'feeCurrency',
  'params',
  'tokenType',
  'protocol',
]) {
    destination: string;
    token: string;
    amount: string | number;
}

export class CreateSolanaTokenBurnTransaction extends OmitType(CreateEthTokenDeployTransactionDto, [
  'fee',
  'feeCurrency',
  'params',
  'tokenType',
  'protocol',
]) {
    token: string;
    amount: string | number;
}

export class CreatenftTransferEthereum extends OmitType(CreateEthTokenDeployTransactionDto,[
  'fee',
  'feeCurrency',
  'params',
  'tokenType',
  'protocol',
]){
  token: string;
  name: string;
  amout: string | number;
}

export class CreatenftMintEthereum extends OmitType(CreateEthTokenDeployTransactionDto,[
  'fee',
  'feeCurrency',
  'params',
  'tokenType',
  'protocol',
]) {
    destination: string;
    token: string;
    amount: string | number;
}

export class CreatenftBurnEthereum extends OmitType(CreateEthTokenDeployTransactionDto,[
  'fee',
  'feeCurrency',
  'params',
  'tokenType',
  'protocol',
]) {
    token: string;
    amount: string | number;
}

export class CreatenftTransferHathor extends OmitType(CreateHathorTokenDeployTransaction,[
  'tokenName',
  'tokenSymbol',
  'mintAuthorityAddress',
]) {
  tokenName: string;
  tokenSymbol: string;
  mintAuthorityAddress: string;
  changeAddress: string;
  tokenUid: string;
  AuthorityAddress?: string;
}


export class CreatenftMintHathor extends OmitType(CreateHathorMintTokenTransaction,[
  'token',
  'mintAuthorityAddress'
]) {
changeAddress: string;
tokenUid: string;
mintAuthorityAddress?: string;
}

export class CreatenftMeltHathor extends OmitType(CreateHathorMeltTokenTransaction,[
  'wallet',
  'token',
  'address',
  'amount',
  'mintAuthorityAddress'
]) {  
changeAddress: string;
token: string;
mintAuthorityAddress?: string;
}

export class TokenTransferCardano extends OmitType(TokenTransferCardano,[
  'token',
  'wallet',
  'address',
  'amount',
  'asset'
]){
  address: string;
  token: string;
  amount: string;
  asset;
  wallet;
}

export class GetNftControllerInstance extends OmitType (GetNftControllerInstance,[
  'wallet',
  'symbol',
  'name',
  'amount',
  'uri',
  'mintAuthorityAddress',
  'meltAuthorityAddress',
  'creators',
  'royaltiesFee',
  'collection',
  'maxSupply',
  'feeCurrency',
  'type',
  'fee'
]) {
type: string;
name: string;
mintAuthorityAddress?: string;
meltAuthorityAddress?: string;
fee;
feeCurrency;
maxSupply: boolean;
collection;
royaltiesFee;
creators;
uri;
amount: string | number;
symbol: string;
wallet;
} //verificar


/*export class KmsController extends OmitType (SetTrustline,[
'protocol',
'method',
'url',
'body',
'config']) {
  protocol: string;
  body: string;
}*/
