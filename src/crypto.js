

// ***********************SYMMETRIC ENCRYPTION*******************************
/* Encrypted & decrypt sent hearts by a user using his password */
export function symmetry_object_encryption(secret, data) {
  /*
  params:
      secret: String, eg - 'password123'
      data: Object, eg - {'id': 1, love_number: 'tnjtj374956'}
  Returns
      encrypted_data: String, eg - '{"iv":"qBmx9ETIRI0jqUT/Wox85g==","v":1,"iter":10000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"n/g4BHUSbrE=","ct":"TaDiSZTwiMUTgBvfg5NtqtH2gFI4mhIzszAFtf1GfbAW1qbAD8PGhrVjbrY="}'
  */
  const stringified_data = JSON.stringify(data); // stringify the object data
  const encrypted_data = window.sjcl.json.encrypt(secret, stringified_data); // encrypt and get the string
  return encrypted_data;
}

export function symmetry_object_decryption(secret, data) {
  /*
  params:
      secret: String, eg - 'password123'
      data: String, eg - '{"iv":"qBmx9ETIRI0jqUT/Wox85g==","v":1,"iter":10000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"n/g4BHUSbrE=","ct":"TaDiSZTwiMUTgBvfg5NtqtH2gFI4mhIzszAFtf1GfbAW1qbAD8PGhrVjbrY="}'
  Returns:
      decrypted_data: Object, eg - { id: 1, love_number: 'tnjtj374956' }
  */
  const decrypted_data = window.sjcl.json.decrypt(secret, data) || "{}";
  const parsed_decrypted_data = JSON.parse(decrypted_data);
  return parsed_decrypted_data;
}

// ***********************SYMMETRIC ENCRYPTION*******************************
// interface KGPyaarKeys {
//   pair: window.SjclKeyPair<window.SjclElGamalPublicKey, window.SjclElGamalSecretKey>;
//   privateKey: BitArray;
//   publicKey: window.SjclECCPublicKeyData;
//   pubToString: (key: window.SjclECCPublicKeyData) => string;
//   privToString: (key: BitArray) => string;
//   generateLoveNumber: (senderPrivKey: string, receiverPubKey: string) => string;
// }

export const pubToString = (key) => {
  return window.sjcl.codec.base64.fromBits(key.x.concat(key.y));
};

export const generateLoveNumber = (senderPrivKey, receiverPubKey) => {
  let senderPrivKeyObj = new window.sjcl.ecc.elGamal.secretKey(
    window.sjcl.ecc.curves.c256,
    window.sjcl.ecc.curves.c256.field.fromBits(window.sjcl.codec.base64.toBits(senderPrivKey))
  );

  let receiverPubKeyObj = new window.sjcl.ecc.elGamal.publicKey(
    window.sjcl.ecc.curves.c256,
    window.sjcl.codec.base64.toBits(receiverPubKey)
  );

  // (g^r)^s = g^(rs) // g^r is receiver_pub_key, s is sender_pvt_key
  let lovenumber = senderPrivKeyObj.dh(receiverPubKeyObj);
  return window.sjcl.codec.hex.fromBits(lovenumber);
};

export const privToString = (key) => {
  return window.sjcl.codec.base64.fromBits(key);
};

export function KGPyaarKeysGen(){
  let pair = window.sjcl.ecc.elGamal.generateKeys(256, 6);

  return {
    pair: pair,
    privateKey: pair.sec.get(),
    publicKey: pair.pub.get(),
  };
};

export function generateSHA256(data) {
  return window.sjcl.codec.hex.fromBits(window.sjcl.hash.sha256.hash(data))
};