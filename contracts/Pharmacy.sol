// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

pragma experimental ABIEncoderV2;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Pharmacy {
    struct Medicien {
        uint256 id;
        uint256 addedOn;
        uint256 parmacyid;
        string name;
        string serial;
        uint256 productiondate;
        uint256 expiredate;
        uint256 manfiactorid;
        string manfiactorname;
    }

    Medicien[] public mediciences;
    Medicien[] public _Seachmedi;
    uint256 _medid;

    constructor() public {
        _medid = 1;
    }

    //////////////////////////////////////////////////////////medicien///////////////////////////////////////////
    function getmedicienbyPharma(uint256 _pharmaid) public {
        delete _Seachmedi;
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (mediciences[i].parmacyid == _pharmaid) {
                _Seachmedi.push(mediciences[i]);
            }
        }
    }

    function returnSearchedMedicienData()
        public
        view
        returns (Medicien[] memory _medicien)
    {
        return _Seachmedi;
    }

    function addmedicen(
        string memory _name,
        string memory _serial,
        string memory _meanfname,
        uint256 profuction,
        uint256 _date,
        uint256 expire,
        uint256 manfiactorid,
        uint256 pharma
    ) public {
        mediciences.push(
            Medicien({
                id: _medid,
                addedOn: _date,
                parmacyid: pharma,
                name: _name,
                serial: _serial,
                productiondate: profuction,
                expiredate: expire,
                manfiactorid: manfiactorid,
                manfiactorname: _meanfname
            })
        );
        _medid++;
    }
}
