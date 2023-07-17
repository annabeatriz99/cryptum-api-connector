/*async  updateSolanaTokenNftMetadata(input:UpdateSolaTokenNftMetadata): Promise<SignedTransaction> {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
   const transaction = this.sdk.updateSolanaNFTMetadata();
  }
  
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
  async  createNftBurnEthereum(input:CreatenftBurnEthereum):Promise<SignedTransaction> {
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
    const {privateKey, address, amount, token, asset} = input;
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
      asset
    })
  }

  async getNftControllerInstance (input: GetNftControllerInstance) :Promise<SignedTransaction>{
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
  }//verificar





  async setTrustline(input:SetTrustline) :Promise<SignedTransaction> {
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
