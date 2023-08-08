// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

pragma experimental ABIEncoderV2;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract User_Login {
    struct User_Obj {
        uint256 userid;
        bool active;
        string name;
        string username;
        string password;
        string phone;
        uint256 addedOn;
        string _type; //"a" admin,"p" pharmacy,"m" manfiactor
    }

    User_Obj[] public users;

    uint256 _userid;

    constructor() public {
        if (users.length == 0) {
            users.push(
                User_Obj({
                    userid: 0,
                    active: true,
                    name: "null",
                    username: "admin",
                    password: "admin",
                    _type:"a",
                    phone:"",
                    addedOn:0
                })
            );
            _userid = 1;
        }
    }

    function login(string memory username, string memory password,string memory typ)
        public
        view
        returns (User_Obj memory user)
    {
        bool find = false;
        for (uint256 i = 0; i < users.length; i++) {
            if (
                uint256(keccak256(abi.encodePacked((users[i].username)))) ==
                uint256(keccak256(abi.encodePacked((username)))) &&
                uint256(keccak256(abi.encodePacked((users[i].password)))) ==
                uint256(keccak256(abi.encodePacked((password)))) &&
                uint256(keccak256(abi.encodePacked((users[i]._type)))) ==
                uint256(keccak256(abi.encodePacked((typ)))) &&
                users[i].active == true
            ) {
                find = true;
                return users[i];
            }
        }

        if (find == false)
            return
                User_Obj({
                    userid: 0,
                    active: false,
                    name: "null",
                    username: "null",
                    password: "null",
                    addedOn:0,
                    phone:"",
                    _type:""
                });
    }

    function regiter(
        string memory username,
        string memory password,
        string memory name,
        string memory typ,
        uint256 add,
        string memory _phone
    ) public {
        User_Obj memory user = login(username, password,typ);
        if (user.active == false) {
            users.push(
                User_Obj({
                    userid: _userid,
                    active: true,
                    name: name,
                    username: username,
                    password: password,
                    _type:typ,
                    phone:_phone,
                    addedOn:add
                })
            );
            _userid++;
        }
    }
}
