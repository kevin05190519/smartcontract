pragma solidity ^0.4.17;
contract ipfs {

struct Medic {
    address dadr;
    string name;
    string dID;
    bool d_exists;

}

struct EMR {
    address padr;
    string pname;
    string pID;
    string hospital;
    string ipfshash;
    bool E_exists;
}

mapping (address => EMR) public EMRs;
mapping (address => Medic) public Medics;
mapping (address => address[]) public permission;

 function doctor_register(string name,string dID) public returns (uint){
    if (Medics[msg.sender].d_exists){
         revert();
    }
    else{
    Medics[msg.sender].dadr=msg.sender;
    Medics[msg.sender].name=name;
    Medics[msg.sender].dID=dID;
    Medics[msg.sender].d_exists=true;
    return 200;
    }
 }

 function give_permisstion(address EMRadr) public returns (uint){
    if (Medics[msg.sender].d_exists && EMRs[EMRadr].E_exists ){
        permission[EMRadr].push(msg.sender);
        return 200;
    }
    else{
        revert();
    }

 }
 function send_hash(address EMRadr,string patientid ,string pname ,string hospital,string hash) public returns (uint){

    if (Medics[msg.sender].d_exists && !EMRs[EMRadr].E_exists ){
    EMRs[EMRadr].padr=EMRadr;
    EMRs[EMRadr].pname=pname;

    EMRs[EMRadr].pID=patientid;
    EMRs[EMRadr].hospital=hospital;
    EMRs[EMRadr].ipfshash=hash;
    EMRs[EMRadr].E_exists=true;
    permission[EMRadr].push(msg.sender);
    return 200;
    }
    else{
    revert();
    }

 }


 function get_hash(address EMRadr) public view returns (uint ,string) {


    if(keccak256(EMRadr) == keccak256(msg.sender)){
        return (200,EMRs[EMRadr].ipfshash);

    }
    else{
    for(uint i=0;i<permission[EMRadr].length;i++){
        if (keccak256(permission[EMRadr][i]) == keccak256(msg.sender)){
        return (200,EMRs[EMRadr].ipfshash);
        }
    }

    }
    return (403,"FAIL");
  }

}
