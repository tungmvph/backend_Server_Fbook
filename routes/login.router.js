var express = require('express');
var router = express.Router();
var UsersController = require("../Controller/Users.controller");
const Usernmodal = require("../Modall/User.modal");
var JWT = require("../Connect/_JWT");
router.post("/login", UsersController.login);

// router.get("/check_token", async function (req, res) {
//     try {
//         // Lấy token từ header "Authorization"
//         const _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IklEVXNlciI6MSwiVXNlck5hbWUiOiJVc2VyMV91cGRhdGUiLCJQYXNzV29yZCI6InVzZXIxcGFzcyIsIkVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJQaG9uZSI6IjExMTIyMjMzMyIsIkJpcnRoZGF5IjoiMTk5MC0wMS0wMSIsIkNyZWF0ZV9hdCI6IjIwMjMtMTEtMTVUMDk6MDc6MDMuMDAwWiJ9LCJpYXQiOjE3MDA1Nzc4MTgsImV4cCI6MTcwMDU4ODYxOH0.Nt6Px1ym04ozD7XUVPGjxtlr454gc8su0Cfgs4LNEWw";
//
//         if (!_token) {
//             throw new Error("Token not provided");
//         }
//
//         const data = await JWT.check(_token);
//         res.send({ data: data });
//     } catch (error) {
//         res.send({ data: "Mã token không hợp lệ" });
//     }
// });

router.get("/check_token", async function (req, res) {
    try {
        // Lấy token từ header "Authorization"
        const _token = req.header("Authorization");

        if (!_token) {
            throw new Error("Token not provided");
        }

        const data = await JWT.check(_token);
        res.send({ data: data });
    } catch (error) {
        res.send({ data: "Mã token không hợp lệ" });
    }
});
router.post('/add', function(req, res, next) {
    const data = req.body; // Dữ liệu từ phần thân yêu cầu
    Usernmodal.create(data, function(result) {
        if (result === null) {
            res.status(500).send('Lỗi máy chủ nội bộ');
        } else {
            res.json(result);
        }
    });
});

module.exports = router;