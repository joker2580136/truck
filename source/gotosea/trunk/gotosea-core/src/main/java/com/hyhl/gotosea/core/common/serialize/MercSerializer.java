package com.hyhl.gotosea.core.common.serialize;

import com.hyhl.gotosea.core.cust.service.IMerchantServiceCore;
import com.hyhl.gotosea.session.util.AppContextHelper;

import java.lang.reflect.Field;
import java.util.Map;

/**
* 
* @author Leslie.Lam
* @create 2017-08-10 14:54
**/
public class MercSerializer extends BaseSerializer<String,Map<String,Object>> {

    private IMerchantServiceCore iMerchantServiceCore = AppContextHelper.getBean(IMerchantServiceCore.class);

    @Override
    public Map<String,Object> beginYourShow(String custId, Field field) throws Exception {
        return iMerchantServiceCore.selectMerchantInfo(custId);
    }
}