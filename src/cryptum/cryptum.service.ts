import { BadRequestException, Injectable } from '@nestjs/common';
import CryptumSdk from 'cryptum-sdk';
import { Block, GetBlockDto } from '../block/dto/get-block.dto';
import { Prices } from '../prices/dto/get-prices.dto';
import { GetTransactionByHashDto } from '../transaction/dto/get-transaction.dto';
import { GetUtxosDto } from '../transaction/dto/get-utxo.dto';
import { SendTransactionDto } from '../transaction/dto/send-transaction.dto';
import { Transaction, UTXO, TransactionResponse } from '../transaction/dto/transaction.dto';
import { GetWalletInfoDto } from '../wallet/dto/get-wallet-info.dto';
// import { Wallet } from '../wallet/dto/wallet.dto';
import { GenerateWalletDto } from '../wallet/dto/generate-wallet.dto';
import {
  CreateBitcoinTransferTransactionDto,
  CreateCardanoTransferTransactionDto,
  CreateCeloTransferTransactionDto,
  CreateEthereumTransferTransactionDto,
  CreateHathorTransferTransactionDto,
  CreateRippleTransferTransactionDto,
  CreateSolanaTransferTransactionDto,
  CreateStellarTransferTransactionDto,
  CreateTrustlineTransactionDto,
  Input,
} from '../transaction/dto/create-transaction.dto';
import { Protocol, TrustlineProtocol } from './interfaces/protocols.interface';
import {
  CallSmartContractDto,
  CallSmartContractResponse,
  CreateSmartContractCallTransactionDto,
  CreateSmartContractDeployTransactionDto,
} from '../transaction/dto/smartcontract-transaction.dto';
import {
  CreateEthTokenDeployTransactionDto,
  CreateHathorMeltTokenTransaction,
  CreateHathorMintTokenTransaction,
  CreateHathorTokenDeployTransaction,
  CreateSolanaTokenDeployTransaction,
  CreateSolanaTokenMintTransaction,
  CreateSolanaTokenBurnTransaction,
  GetNftControllerInstance,
  createNFTtransaction,
  createNFTtransfer,
  CreateNFTtransfer,
  CreatenftMintEthereum,
  CreateNftBurnEthereum,
  CreatenftTransferHathor,
  PostCreate,
} from '../transaction/dto/token-transaction.dto';
import {
  BitcoinTransferTransactionInput,
  CeloTransferTransactionInput,
  EthereumTransferTransactionInput,
  HathorTransferTransactionInput,
  RippleTransferTransactionInput,
  SignedTransaction,
  SmartContractDeployTransactionInput,
  SolanaTransferTransactionInput,
  StellarTransferTransactionInput,
} from 'cryptum-sdk/dist/src/features/transaction/entity';
import config from '../config';
import { NftController } from 'cryptum-sdk/dist/src/features/nft/controller';
import { Wallet } from 'cryptum-sdk/dist/src/features/wallet/entity';
import { promises } from 'dns';
import { GetInfoNtf } from 'src/nft/dto/nft-transaction.dto';
import {GetMetadataNft} from 'src/nft/dto/nft-transaction.dto';
import { NftMetadata } from 'cryptum-sdk/dist/src/features/nft/entity';
import { PostCreateNft } from 'src/nft/dto/nft-transaction.dto';

@Injectable()
export class CryptumService {
  sdk: CryptumSdk;

  constructor() {
    this.sdk = new CryptumSdk(config.cryptumConfig());
  }
  generateRandomMnemonic(strength?: number): string {
    return this.sdk.getWalletController().generateRandomMnemonic(strength);
  }
  async generateWallet(input: GenerateWalletDto) {
    return this.sdk.getWalletController().generateWallet(input);
  }
  async getWalletInfo(input: GetWalletInfoDto) {
    return this.sdk.getWalletController().getWalletInfo(input);
  }
  async getTransactionByHash(input: GetTransactionByHashDto): Promise<Transaction> {
    return this.sdk.getTransactionController().getTransactionByHash(input);
  }
  async getUtxos(input: GetUtxosDto): Promise<UTXO[]> {
    return this.sdk.getTransactionController().getUTXOs(input);
  }
  async getBlock(input: GetBlockDto): Promise<Block> {
    return this.sdk.getTransactionController().getBlock(input);
  }
  async sendTransaction(input: SendTransactionDto): Promise<TransactionResponse> {
    return this.sdk.getTransactionController().sendTransaction(input);
  }
  async getPrices(asset: string): Promise<Prices> {
    return this.sdk.getPricesController().getPrices(asset);
  }
  async createTrustlineTransaction(input: CreateTrustlineTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { protocol, privateKey, assetSymbol, issuer, limit, memo, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    const transaction = {
      wallet,
      assetSymbol,
      issuer,
      limit,
      memo,
      fee,
    } as any;
    switch (protocol) {
      case TrustlineProtocol.STELLAR:
        return txController.createStellarTrustlineTransaction(transaction);
      case TrustlineProtocol.RIPPLE:
        return txController.createRippleTrustlineTransaction(transaction);
      default:
        throw new BadRequestException('Unsupported protocol');
    }
  }
  async createStellarTransferTransaction(input: CreateStellarTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, issuer, assetSymbol, amount, destination, memo, createAccount, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.STELLAR,
      privateKey,
    });
    return txController.createStellarTransferTransaction({
      wallet,
      assetSymbol,
      issuer,
      amount,
      destination,
      createAccount,
      memo,
      fee,
    } as StellarTransferTransactionInput);
  }
  async createRippleTransferTransaction(input: CreateRippleTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, issuer, assetSymbol, amount, destination, memo, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.RIPPLE,
      privateKey,
    });
    return txController.createRippleTransferTransaction({
      wallet,
      assetSymbol,
      issuer,
      amount,
      destination,
      memo,
      fee,
    } as RippleTransferTransactionInput);
  }
  async createCeloTransferTransaction(input: CreateCeloTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, feeCurrency, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.CELO,
      privateKey,
    });
    return txController.createCeloTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      feeCurrency,
      fee,
    } as CeloTransferTransactionInput);
  }
  async createEthereumTransferTransaction(input: CreateEthereumTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.ETHEREUM,
      privateKey,
    });
    return txController.createEthereumTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    } as EthereumTransferTransactionInput);
  }
  async createBscTransferTransaction(input: CreateEthereumTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.BSC,
      privateKey,
    });
    return txController.createBscTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    } as EthereumTransferTransactionInput);
  }
  async createPolygonTransferTransaction(input: CreateEthereumTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.POLYGON,
      privateKey,
    });
    return txController.createPolygonTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    } as EthereumTransferTransactionInput);
  }
  async createAvaxCChainTransferTransaction(input: CreateEthereumTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.AVAXCCHAIN,
      privateKey,
    });
    return txController.createAvaxCChainTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    } as EthereumTransferTransactionInput);
  }
  async createBitcoinTransferTransaction(input: CreateBitcoinTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, inputs, outputs } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.BITCOIN,
      privateKey,
    });
    return txController.createBitcoinTransferTransaction({
      wallet,
      inputs,
      outputs,
    } as BitcoinTransferTransactionInput);
  }
  async createHathorTransferTransaction(input: CreateHathorTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const { privateKey, inputs, outputs } = input;

    if (privateKey) {
      const walletController = this.sdk.getWalletController();
      const wallet = await walletController.generateWalletFromPrivateKey({
        protocol: Protocol.HATHOR,
        privateKey,
      });
      return txController.createHathorTransferTransactionFromWallet({
        wallet,
        outputs,
      } as HathorTransferTransactionInput);
    } else if (inputs) {
      return txController.createHathorTransferTransactionFromUTXO({
        inputs,
        outputs,
      } as HathorTransferTransactionInput);
    } else {
      throw new BadRequestException('Missing private key or inputs');
    }
  }
  async createCardanoTransferTransaction(input: CreateCardanoTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const { privateKey, inputs, outputs } = input;

    if (privateKey) {
      const walletController = this.sdk.getWalletController();
      const wallet = await walletController.generateWalletFromPrivateKey({
        protocol: Protocol.CARDANO,
        privateKey,
      } as any);
      return txController.createCardanoTransferTransactionFromWallet({
        wallet,
        outputs,
      } as any);
    } else if (inputs) {
      return txController.createCardanoTransferTransactionFromUTXO({
        inputs,
        outputs,
      } as any);
    } else {
      throw new BadRequestException('Missing private key or inputs');
    }
  }
  async createSolanaTransferTransaction(input: CreateSolanaTransferTransactionDto): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, token, amount, destination } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.SOLANA,
      privateKey,
    });
    wallet.publicKey = wallet.address;
    return txController.createSolanaTransferTransaction({
      wallet,
      token,
      amount,
      destination,
    } as SolanaTransferTransactionInput);
  }
  async callSmartContractMethod(input: CallSmartContractDto): Promise<CallSmartContractResponse> {
    const { from, protocol, contractAbi, method, params, contractAddress } = input;
    const contractController = this.sdk.getContractController();
    return contractController.callMethod({
      from,
      contractAbi,
      method,
      params,
      contractAddress,
      protocol,
    });
  }
  async createSmartContractCallTransaction(input: CreateSmartContractCallTransactionDto): Promise<SignedTransaction> {
    const scController = this.sdk.getContractController();
    const walletController = this.sdk.getWalletController();
    const { protocol, privateKey, contractAddress, contractAbi, method, params, fee, feeCurrency } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return scController.buildMethodTransaction({
      protocol,
      wallet,
      contractAbi,
      method,
      params,
      contractAddress,
      fee,
      feeCurrency,
    });
  }
  async createSmartContractDeployTransaction(
    input: CreateSmartContractDeployTransactionDto,
  ): Promise<SignedTransaction> {
    const scController = this.sdk.getContractController();
    const walletController = this.sdk.getWalletController();
    const { protocol, privateKey, contractName, source, params, fee, feeCurrency } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return scController.buildDeployTransaction({
      protocol,
      wallet,
      contractName,
      source,
      params,
      fee,
      feeCurrency,
    } as SmartContractDeployTransactionInput);
  }
  async createEthTokenDeployTransaction(input: CreateEthTokenDeployTransactionDto): Promise<SignedTransaction> {
    const scController = this.sdk.getContractController();
    const walletController = this.sdk.getWalletController();
    const { protocol, privateKey, tokenType, params, fee, feeCurrency } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    return scController.buildDeployTokenTransaction({
      protocol,
      wallet,
      tokenType,
      params,
      fee,
      feeCurrency,
    });
  }
  async createHathorTokenDeployTransaction(input: CreateHathorTokenDeployTransaction): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenName, tokenSymbol, address, amount, mintAuthorityAddress, meltAuthorityAddress } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.HATHOR,
      privateKey,
    });
    return txController.createHathorTokenTransactionFromWallet({
      wallet,
      tokenName,
      tokenSymbol,
      amount,
      type: 'HATHOR_TOKEN_CREATION',
      mintAuthorityAddress,
      meltAuthorityAddress,
      address,
    });
  }
  async createHathorMintTokenTransaction(input: CreateHathorMintTokenTransaction): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenUid, amount, mintAuthorityAddress, changeAddress, address } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.HATHOR,
      privateKey,
    });
    return txController.createHathorTokenTransactionFromWallet({
      wallet,
      tokenUid,
      amount,
      address,
      changeAddress,
      type: 'HATHOR_TOKEN_MINT',
      mintAuthorityAddress,
    });
  }
  async createHathorMeltTokenTransaction(input: CreateHathorMeltTokenTransaction): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenUid, amount, changeAddress, address, meltAuthorityAddress } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.HATHOR,
      privateKey,
    });
    return txController.createHathorTokenTransactionFromWallet({
      wallet,
      tokenUid,
      amount,
      address,
      changeAddress,
      type: 'HATHOR_TOKEN_MELT',
      meltAuthorityAddress,
    });
  }
  async createSolanaTokenDeployTransaction(input: CreateSolanaTokenDeployTransaction): Promise<{
    mint: string;
    metadata: any;
    transaction: SignedTransaction;
  }> {
    const { privateKey, tokenName, tokenSymbol, amount, fixedSupply, decimals } = input;
    const wallet = await this.sdk.wallet.generateWalletFromPrivateKey({
      protocol: Protocol.SOLANA,
      privateKey,
    });
    return this.sdk.transaction.createSolanaTokenDeployTransaction({
      wallet,
      name: tokenName,
      symbol: tokenSymbol,
      amount,
      fixedSupply,
      decimals,
    });
  }
  async createSolanaTokenMintTransaction(input: CreateSolanaTokenMintTransaction): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, destination, token, amount } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.SOLANA,
      privateKey,
    });
    return txController.createSolanaTokenMintTransaction({
      wallet,
      destination,
      token,
      amount,
    });
  }
  async createSolanaTokenBurnTransaction(input: CreateSolanaTokenBurnTransaction): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, token, amount } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.SOLANA,
      privateKey,
    });
    return txController.createSolanaTokenBurnTransaction({
      wallet,
      token,
      amount,
    });
  }
  /*async  updateSolanaTokenNftMetadata(input:UpdateSolaTokenNftMetadata): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
   const transaction = this.sdk.updateSolanaNFTMetadata();
  }*/

  
  
  async  createNftTransferEthereum(input:CreatenftTransferEthereum) :Promise<SignedTransaction> {
    const { privateKey, token, amount } = input;
    const walletController = this.sdk.getWalletController();
  
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.ETHEREUM,
      privateKey,
    });
  
    const nftController = this.sdk.getNftController();
    return nftController.transfer({
      wallet,
      name: token.name,
      symbol: token.symbol,
      type: 'ETHEREUM_TOKEN_MELT',
      protocol: Protocol.ETHEREUM,
    });
  }
  async  createNftMintEthereum(input:CreatenftMintEthereum):Promise<SignedTransaction> {
    const { privateKey, destination, token, amount } = input;
    const walletController = this.sdk.getWalletController();
  
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.ETHEREUM,
      privateKey,
    });
  
    const nftController = this.sdk.getNftController();
    return nftController.createNftMintEthereum({
      wallet,
      destination,
      token,
      amount,
    });
  }
  async  createNftBurnEthereum(input:CreateNftBurnEthereum):Promise<SignedTransaction> {
    const { privateKey, token, amount } = input;
    const walletController = this.sdk.getWalletController();
  
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.ETHEREUM,
      privateKey,
    });
    const txController = this.sdk.getNftController();
    return txController.createNftBurnEthereum({
      wallet,
      token,
      amount,
    });
  }
  async  createNftTransferHathor(input:CreatenftTransferHathor) :Promise<SignedTransaction> {
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenName, tokenSymbol, address, amount, mintAuthorityAddress, meltAuthorityAddress } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.HATHOR,
      privateKey,
    });
    const txController = this.sdk.getNftController();
    return txController.transfer({
      wallet,
      tokenName,
      tokenSymbol,
      amount,
      type: 'HATHOR_NFT_CREATE',
      mintAuthorityAddress,
      meltAuthorityAddress,
      address,
    });
  }
  async createNftMintHathor(input: CreatenftMintHathor) :Promise<SignedTransaction>{
    const walletController = this.sdk.getWalletController();
    const {privateKey,wallet,token, address,amount, mintAuthorityAddress} = input;
    const wallet =await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.HATHOR,
      privateKey
    });
    const txController = this.sdk.getNftController();
    return txController = createNftMintHathor({
      wallet,
      token,
      address,
      amount,
      mintAuthorityAddress
    });
  
  }
    async createNftMeltHathor(input: CreatenftMeltHathor) :Promise<SignedTransaction>{
    const walletController = this.sdk.getWalletController();
    const {privateKey,wallet,token, address,amount, mintAuthorityAddress} = input;
    const wallet =await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.HATHOR,
      privateKey
    });
    const txController = this.sdk.getNftController();
    return txController.createNftMeltHathor({
      wallet,
      token,
      address,
      amount,
      mintAuthorityAddress
    });
  
  }

  async tokenTransferCardano (input: TokenTransferCardano) :Promise<SignedTransaction>{
    const walletController = this.sdk.getWalletController();
    const {protocol, privateKey, address, amount, token, asset} = input;
    const wallet = await walletController.generateCardanoWallet({
      protocol: Protocol.CARDANO,
      privateKey
    })
    const txController = this.sdk.getTokenController();
    return txController.tokenTransferCardano({
      wallet,
      address,
      amount,
      token,
      asset,
      protocol
    })
  }

  /*async getNftControllerInstance (input: GetNftControllerInstance) :Promise<SignedTransaction>{
    const walletController = this.sdk.getNftController();
    const {privateKey, symbol, name, amount, uri, mintAuthorityAddress, meltAuthorityAddress, creators, royaltiesFee, collection, maxSupply, feeCurrency, type, fee} = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      Protocol: Protocol,
      privateKey
    })
    const txController = this.sdk.getNftController();
    return txController.getNftControllerInstance({
      wallet,
      symbol,
      name,
      amount,
      uri,
      mintAuthorityAddress,
      meltAuthorityAddress,
      creators,
      royaltiesFee,
      collection,
      maxSupply,
      feeCurrency,
      type,
      fee
    })
  }*/ //verificar

  /*async setTrustline(input:SetTrustline) :Promise<SignedTransaction> {
    const { protocol, body, url, method, config} = input;
    const txController = this.sdk.setTrustline();
    return txController.setTrustline ({
      protocol: input.protocol,
      method: 'post',
      url: '/kms/token/trustline',
      body: input,
      config:
    });
  }*/

  async getInfoNft(input:GetInfoNtf) {
    const nftController = this.sdk.getNftController()
    const {protocol, tokenAddress} = input;

    return nftController.getInfo({
      protocol,
      tokenAddress
    })

  }
  async getBalanceNft(input: GetBalanceNFt): Promise<NftBalanceInfo> {
    const { protocol, address, tokenUid, tokenId, tokenAddress } = input;
    const nftController = this.sdk.getNftController()

    switch (protocol) {
      case Protocol.HATHOR:
        return nftController.getBalance({
          protocol,
          address,
          tokenUid
        })
      case Protocol.ETHEREUM:
      case Protocol.CELO:
      case Protocol.BSC:
      case Protocol.POLYGON:
      case Protocol.AVAXCCHAIN:
      case Protocol.CHILIZ:
      case Protocol.SOLANA:
        return nftController.getBalance({
          protocol,
          tokenAddress,
          address,
          tokenId
        })
      default:
        break
    }
  }

  async getMetadataNft(input:GetMetadataNft) : Promise<NftMetadata>{
  const {protocol, tokenUid, tokenAddress, tokenId} = input
  const nftController = this.sdk.getNftController()
  switch (protocol){
    case Protocol.BSC:
      return nftController.getMetadata({
        protocol,
        tokenAddress,
        tokenId,
        tokenUid
      })
      default:
        break
  }
}
  
async postCreateNft(input:PostCreateNft):Promise<TransactionResponse>{
  const { protocol, wallet, symbol, name, type} = input;
  const nftController = this.sdk.getNftController()
  switch(protocol){
    case Protocol.BSC:
      return nftController.postCreate({
    protocol,
    wallet,
    symbol,
    name,
    type
      })
      default:
        break
  }
}
   

}









