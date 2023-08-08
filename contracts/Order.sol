// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

pragma experimental ABIEncoderV2;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Order {
    struct Orders {
        uint256 _date;
        uint256 orderid;
        uint256 medicienid;
        bool confirmed;
        bool recieved;
        uint256 manfiactorid;
        uint256 parmacyid;
    }
    Orders[] public orders;
    Orders[] public _SearchOrders;
    uint256 _orderid;

    constructor() public {
        _orderid = 1;
    }

    function getOrderbypharma(uint256 _pharmaid) public {
        delete _SearchOrders;
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].parmacyid == _pharmaid) {
                _SearchOrders.push(orders[i]);
            }
        }
    }

    function getOrderbymanfi(uint256 _manficid) public {
        delete _SearchOrders;
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].manfiactorid == _manficid) {
                _SearchOrders.push(orders[i]);
            }
        }
    }

    function SSgetOrderbypharma(uint256 _pharmaid) public {
        delete _SearchOrders;
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].manfiactorid == _pharmaid) {
                _SearchOrders.push(orders[i]);
            }
        }
    }

    function addOrder(
        uint256 medicienid,
        uint256 manfiactorid,
        uint256 parmacyid,
        uint256 _date
    ) public {
        orders.push(
            Orders({
                orderid: _orderid,
                medicienid: medicienid,
                manfiactorid: manfiactorid,
                parmacyid: parmacyid,
                _date:_date,
                confirmed: false,
                recieved: false
            })
        );
        _orderid++;
    }

    function confirmOrder(uint256 orderid) public {
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].orderid == orderid) {
                orders[i].confirmed = true;
            }
        }
    }

    function recieveOrder(uint256 orderid) public {
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].orderid == orderid) {
                orders[i].recieved = true;
            }
        }
    }

    function returnSearchedOrderData()
        public
        view
        returns (Orders[] memory _medicien)
    {
        return _SearchOrders;
    }
}
