package com.ifoods.service.transaction.impl;

import com.ifoods.model.Asset;
import com.ifoods.model.Transaction;
import com.ifoods.service.transaction.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

/**
 * 资产注册交易 TxType=64
 * 
 */
@Service
public class RegisterTransactionService implements TransactionService
{
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void deal(Transaction transaction) {
        Transaction.Payload payload = transaction.getPayload();

        //资产信息输出化
        Asset asset = payload.getAsset();
        asset.setAssetID(transaction.getHash());
        asset.setAmount(payload.getAmount());

        //保存资产信息
        mongoTemplate.save(asset);

        //保存交易信息
        transaction.setTypeName("资产注册交易");
        mongoTemplate.save(transaction);
    }
}
