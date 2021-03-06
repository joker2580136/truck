package com.hyhl.gotosea.core.rabbitmq.bean;

import java.io.Serializable;

public class MqWithdrawSuccess implements Serializable{
	private static final long serialVersionUID = 1L;
	private String custId;
	private String phone;
	private String imMsg;
	private Integer money;
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getImMsg() {
		return imMsg;
	}
	public void setImMsg(String imMsg) {
		this.imMsg = imMsg;
	}
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public Integer getMoney() {
		return money;
	}
	public void setMoney(Integer money) {
		this.money = money;
	}
}
