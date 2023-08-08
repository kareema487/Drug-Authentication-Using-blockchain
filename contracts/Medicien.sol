// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

pragma experimental ABIEncoderV2;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Mediciences {
    struct Medicien {
        uint256 id;
        string name;
        string serial;
        uint256 productiondate;
        uint256 expiredate;
        uint256 manfiactorid;
        string manfiactorname;
        bool delivired;
        bool ordered;
        uint256 createdDate;
        uint256 orderedDate;
        uint256 deliveredDate;
    }

    Medicien[] public mediciences;
    Medicien[] public _Searchmedicien;
    uint256 _id;

    constructor() public {
        _id = 1;
    }

    function getmedicienbymanf(uint256 _manfiactorid) public {
        delete _Searchmedicien;
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (mediciences[i].manfiactorid == _manfiactorid) {
                _Searchmedicien.push(mediciences[i]);
            }
        }
    }

    function get_nonorderd_nonconfirmed_medicien() public {
        delete _Searchmedicien;
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (
                mediciences[i].delivired == false &&
                mediciences[i].ordered == false
            ) {
                _Searchmedicien.push(mediciences[i]);
            }
        }
    }

    function returnSearchedData()
        public
        view
        returns (Medicien[] memory _medicien)
    {
        return _Searchmedicien;
    }

    function getmedicien(uint256 id)
        public
        view
        returns (Medicien memory _medicien)
    {
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (mediciences[i].id == id) {
                return (mediciences[i]);
            }
        }
        return
            Medicien({
                name: "null",
                id: 0,
                serial: "null",
                productiondate: 0,
                expiredate: 0,
                manfiactorid: 0,
                manfiactorname: "",
                delivired: false,
                ordered: false,
                createdDate: 0,
                orderedDate: 0,
                deliveredDate: 0
            });
    }

    function getmedicien_serial(string memory seial)
        public
        view
        returns (Medicien memory _medicien)
    {
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (
                uint256(keccak256(abi.encodePacked((mediciences[i].serial)))) ==
                uint256(keccak256(abi.encodePacked((seial))))
            ) {
                return (mediciences[i]);
            }
        }
        return
            Medicien({
                name: "null",
                id: 0,
                serial: "null",
                productiondate: 0,
                expiredate: 0,
                manfiactorname: "",
                manfiactorid: 0,
                delivired: false,
                ordered: false,
                createdDate: 0,
                orderedDate: 0,
                deliveredDate: 0
            });
    }

    function addmedicen(
        string memory _name,
        string memory _serial,
        uint256 profuction,
        uint256 expire,
        string memory _manName,
        uint256 manfiactorid,
        uint256 date
    ) public {
        Medicien memory med = getmedicien_serial(_serial);
        if (med.id == 0) {
            mediciences.push(
                Medicien({
                    id: _id,
                    name: _name,
                    serial: _serial,
                    productiondate: profuction,
                    manfiactorname: _manName,
                    expiredate: expire,
                    manfiactorid: manfiactorid,
                    delivired: false,
                    ordered: false,
                    createdDate: date,
                    orderedDate: 0,
                    deliveredDate: 0
                })
            );
            _id++;
        }
    }

    function OrderMedicien(uint256 _medid, uint256 date) public {
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (
                mediciences[i].id == _medid && mediciences[i].ordered == false
            ) {
                mediciences[i].ordered = true;
                mediciences[i].orderedDate = date;
            }
        }
    }

    function deleiverMedicien(uint256 _medid, uint256 date) public {
        for (uint256 i = 0; i < mediciences.length; i++) {
            if (
                mediciences[i].id == _medid && mediciences[i].delivired == false
            ) {
                mediciences[i].delivired = true;
                mediciences[i].deliveredDate = date;
            }
        }
    }
}
