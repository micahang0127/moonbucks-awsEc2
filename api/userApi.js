const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
      require('../passport/index')(passport);
const flash = require('connect-flash');
const dbConn = require('../mariaDBConn');

console.log('userApi.js진입');

const dbUserTest = {
  stestId : 'aaaa',
  stestPw : 'bbbb'
};





/*
 위 코드 대신 커스텀 콜백을 사용(ajax라서 json응답을 줘야하기 때문에)

 authenticate('local',) 하면 => passport/local.js를 실행
 여기서 local은 사용자의 아이디, 비밀번호를 사용해 로그인인증을 하는것을 의미한다. 
 (만약, kakao나 다른 서비스를 이용하여 로그인 인증을 하게 되면 local 대신 다른 값으로 바뀐다.)
*/
router.post('/login', (req, res, next) => {                                      // saga에서 요청 들어옴 req는 loginData가 들어와야함.
  
   
  passport.authenticate('local', (err, user, info) => {                          // local.js에서 db매칭 성공 시의 done에서 온다.
    console.log('passport authenticate접근'+JSON.stringify(user));                // DB user
    console.log('massgae'+JSON.stringify(info));                // DB user
    if (info) {                                                                  // info로 들어온 플래시 메세지 처리
            req.flash('error')
             req.session.flash.error = info.message;
             console.log('error info'+JSON.stringify(req.session)); 
             res.redirect('/login')
    }                                   
    if(err) { res.status(500).json(err); }
    if(!user) { console.log('userApi passport authenticate 유저없음');  
                console.log(JSON.stringify(req.session));          // local에서 user매칭이 틀리면(비번틀림,회원아님) 이리로 들어온다.
                // res.json(info.message)                                       // 하면, 아래 redirect로 안가고, api/login으로 넘어간다. 
                return  res.redirect('/login');                                 // redirect를 사용하면, 3000포트(client)를 사용한다
                //return res.status(401).json( { success : false, message : info.message } )     // info.message는 local에서 error시 정의했던 message내용
              }
                   
    req.login(user, (err) => {                                // => serialize로 이동  
        console.log('req.login진입 - 입력user === dbuser와 매칭 맞은 상태')
        if(err) { 
            console.log('userApi req.login Error'+err);
            console.log('2222'+JSON.stringify(req.session));
            return res.json({ Success : false, message : 'req.json 실패입니다.' }) 
               
        } 
        // return res.redirect('/ownerHome')      
      }); 
    })(req, res, next);          // authenticate 반환 메서드에 이 인자를 넣어서 처리해야한다. 
    return res.redirect('/ownerHome')   
    // res.json(user);           // desialize에서 req.user를 -> req.login실행으로 들어와 -> return res.json(user)로 client에 응답
                                              // req.login 안 끝에서 진행하면, DB의 user를 return 할 수 있으나, 
});                                            // 거기서 진행하면 req.login가 이상하게 다시한번 실행됨.
            
       
       
   
router.get('/user', (req, res) => {                          // (주의) client에서 요청시 접근
    console.log('get login'+JSON.stringify(req.user));      // session에 저장된 값   
    // res.json(req.user);      
    if(!req.user) {
      res.redirect('/login');
    }
    else { 
      return res.json(req.user)
      // return res.redirect('/ownerHome');
    }     
});   


router.get('/loginError', (req, res) => {                          // (주의) client에서 요청시 접근
    console.log('get loginError'+JSON.stringify(req.session.flash));      // session에 저장된 값   
    const massage = req.session.flash;    
    if(massage) {
      return res.json(massage)     
      // return res.send(massage)       
    }
    // else { 
      // return res.send('없음')
    // }     
});   



      
router.get('/logout', (req, res)=> {              // post /api/logout
  req.logout();                                   // 하면 로그아웃 되면 세션도 끊어준다. 
  req.session.destroy(function(err){               // 세션을 지우는 방법.
    res.redirect('/login');
  });
  // req.session.save(function(){  // 현재의 세션 상태를 저장하고, redirect
  //   res.redirect('/login');
  // })
});
     
               
/*
// * 기본 형태
router.post("/testLogin", (req, res) => {   
  // db select문 수행
  dbConn((err, connection) => {
    connection.query("SELECT * FROM owner", (err, rows) => {
      connection.release(); // 연결세션 반환.
      if (err) {
        throw err;
      }
      return res.json( rows ); // 결과는 rows에 담아 전송 http://localhost:3000/api/testLogin 또는 5000번 포트
    });
    if(err) throw err;
  });
});
*/


// 회원가입 

// query -> 매장id는 client에서 data삽입 전달
// insert into owner(ownerId, name, password, phone, storeId)
// values ('ccc@ccc.com','김일일', 'test01#', '010-000-0000', 0);
// 회원가입 router

// query : select storeId, name from store;
router.post('/store', (req, res) => {
  
  dbConn((err, connection) => {
    connection.query("SELECT storeId, name FROM store", (err, rows) => {
      connection.release(); // 연결세션 반환.
      if (err) {
        throw err;
      }
      return res.send( rows ); 
    });
    if(err) throw err;
  });
})





module.exports = router;



/*
* saga + passport 이용 시 
saga에서 withCredentials처리 
앞서 saga에서 withCredentials 가지고 왔기 때문에 passport에 deserializeUser 통과한다.
그러나 쿠키가 없기 때문에 별일 없이 통과는 하는데
req.user는 값이 없게 된다.
그 다음 req.login을 하게 되면 우리가 만들어 놓은 passport local 로그인 전략을 사용하게 된다. 
*/