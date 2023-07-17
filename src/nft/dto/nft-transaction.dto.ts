import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Protocol } from '../../cryptum/interfaces/protocols.interface';
import { EthTokenType } from 'src/transaction/dto/transaction.dto';

export class GetInfoNft {
    @ApiProperty()
    tokenAddress: string;

    @ApiProperty()
    @IsEnum(Protocol)
    protocol: Protocol

    constructor(tokenAddress: string, protocol: Protocol){
        this.tokenAddress = tokenAddress;
        this.protocol = protocol;
    }
}

export class GetBalanceNFt {
    @ApiProperty()
    @IsEnum(Protocol)
    protocol: Protocol

    @ApiProperty()
    tokenUid : string
    @ApiProperty()
    tokenAddress: string
    @ApiProperty()
    tokenId: string
    @ApiProperty()
    address: string

    constructor(protocol: Protocol, tokenUid: string , tokenAddress: string, tokenId: string, address: string){
        this.tokenAddress = tokenAddress;
        this.protocol = protocol;
        this.tokenUid = tokenUid;
        this.tokenId = tokenId;
        this.address = address;
    }

}

export class GetMetadataNft {
    @ApiProperty()
    @IsEnum(Protocol)
    protocol: Protocol

    @ApiProperty()
    tokenUid : string
    @ApiProperty()
    tokenAddress: string
    @ApiProperty()
    tokenId: string

    constructor(protocol: Protocol, tokenUid: string, tokenAddress: string, tokenId: string){
        this.tokenAddress = tokenAddress;
        this.protocol = protocol;
        this.tokenId =tokenId;
        this.tokenUid = tokenUid;
    }
}

export class PostCreateNft{
    @ApiProperty()
    @IsEnum(Protocol)
    protocol: Protocol

    @ApiProperty()
    symbol: symbol

    @ApiProperty()
    name: string

    @ApiProperty()
    type: string

    @ApiProperty()
    wallet: string

    constructor(protocol:Protocol, symbol:symbol, name: string, type: string, wallet: string){
        this.protocol = protocol;
        this.symbol = symbol;
        this.name = name;
        this.type = type;
        this.wallet = wallet;
    }
}

