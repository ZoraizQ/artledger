from desopip.Route import getRoute
import requests
from base58 import b58decode_check


def addExtraData(transactionHex, derivedKey):
    compressed_key = b58decode_check(derivedKey)[3:].hex()
    payload = {"TransactionHex": transactionHex,
               "ExtraData": {"DerivedPublicKey": compressed_key}}
    endpoint = getRoute() + "append-extra-data"
    res = requests.post(endpoint, json=payload)
    TransactionHex = res.json()["TransactionHex"]
    return TransactionHex


def addExtraDataDict(transactionHex, extraData):
    payload = {"TransactionHex": transactionHex,
               "ExtraData": extraData}
    endpoint = getRoute() + "append-extra-data"
    res = requests.post(endpoint, json=payload)
    try:
        TransactionHex = res.json()["TransactionHex"]
    except:
        print(res.json())
    return TransactionHex

