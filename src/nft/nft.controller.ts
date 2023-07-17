import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptumService } from '../cryptum/cryptum.service';
import { GetBalanceNFt, GetInfoNft, GetMetadataNft, PostCreateNft } from './dto/nft-transaction.dto';
import { create } from 'domain';
import { query } from 'express';


@ApiTags("Nft")
@Controller("nft")
export class NftController {
    constructor(private cryptumService: CryptumService) {}

    @Get('info')
    async getInfoNFt(
        @Query() queryString: GetInfoNft
    ) {
        const { protocol, tokenAddress } = queryString
        return await this.cryptumService.getInfoNft({
            protocol,
            tokenAddress
        })
    }

    @Get('balance')
    async getBalanceNft(@Query() queryString : GetBalanceNFt){
        return await this.cryptumService.getBalanceNft(queryString)
    }

    @Get('metadata')
    async getMetadataNft(
        @Query()queryString:GetMetadataNft
    ){
        return await this.cryptumService.getMetadataNft(queryString)
    }

    @Post('create')
    async postCreateNft(
        @Query()queryString:PostCreateNft
    ){
        return await this.cryptumService.postCreateNft(queryString)
    }

    @Get('CreateNftBurnEthereum')
    async createNftBurnEthereum(@Query()queryString:CreateNftBurnEthereum){
        return await this.cryptumService.createNftBurnEthereum(queryString)
    }
}