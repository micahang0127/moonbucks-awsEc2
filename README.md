

### AWS EC2 배포 참고
* 1. ASW 인스턴스 생성 ( EC2)
 * AWS 회원가입 -> 카드연결(확인용1$) -> 콘솔 로그인
 * 인스턴스 생성
 * 인스턴스 사용자 포트 변경
    1) 인스턴스 아래 보안그룹 launch-wizard-1 클릭
    2) 작업 -> 인바운드 규칙 편집
    3) 편집하고 저장

* 2. RDS 생성 (mysql)
 *  database 배포

* 3. (AWS)Amazon Linux 인스턴스에서 node.js 설치
  1)  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  2) . ~/.nvm/nvm.sh
  3) nvm install node
  4) 확인 
    node -e "console.log('Running Node.js ' + process.version)"
	Running Node.js v13.12.0

* 4. Git 설치
1)  sudo yum install git -> y
2) git clone url
3) cd moonbucks_react_node
4) npm i 
5) npm run start


* 5. Git clone (terminal실행- mac기준)
1) ssh -i "ReactNodeEc2.pem" ~~~~
   ssh 접속
2) git clone [url]
   코드 변경 시) git pull

* 6. 실행 
nohup yarn dev(명령어) &

* 7. 종료
1) ps -ef
    구동 process 확인
2) sudo kill -9  [ 종료하고 싶은 프로세스 PID ] 


* * *
#### ※ [개인 프로젝트] 프로젝트명 : Moonbucks_react_node
* * *
#### * Notion포트폴리오(chrome에서 작동): <https://www.notion.so/Portfolio-772ed24acfc14bf1a1d9e40a89edcf6e>
#### * 개인 포트폴리오 : <https://moonbucks-react-node.herokuapp.com/adminHome>
   


* * *
#### client : create-react-app
#### server : node.js express
#### DB : MariaDB 
    

* * *
#### [프로젝트소개]      
스타벅스같은 체인점 카페들을 모티브 삼아, 체인점 시스템에서 [본점]과 [지점들]에서 각 통계치를 관제할 수 있는 사이트.

Actor1 : 본점 관리자. 
         전체매장 통계치 확인
         각 지점들을 kakao map을 통해 확인하고, 각 매장 정보와 통계치를 확인할 수 있다. 

Actor2 : 매장 지점장.
         1매장 당 1명의 매장주 가입만 가능.
         본인 매장의 월별 통계치를 chart로 확인 할 수 있다. 
        
        
         
* * *
#### [사용기술]
**[  front-end ]**    
 create-react-app,  react-redux, redux-saga, axios,  react-router-dom

**[ back-end ]**    
 node.js , Express, concurrently, body-parser,
 passport, passport-local, cookie-parser, express-session, dotenv
 cors

**[ API ]**     
kakoMap API(지도), recharts(차트)

**[ DB  &  기타 ]**     
proxy, fs, git, redux-devtools-extends, maraiDB

**[ Port ]**     
Client : React ( port : 3000 )
Server : node ( port : 5000 )



* * *
#### [대표기능]
*[ client ]
1. axios
2. React REdux + Redux saga
3. Map API (kakao Map API)
4. Chart API (rechart API)
5. 미로그인 : 화면 blur처리 -> 로그인 : blur제거
6. SCSS
    
*[ server ]
1. Passport - login
2. Express Router
3. Maria DB Connect
4. Git ( reflog / stash )
   
*[ DB ]
1. DB 설계 정규화 ( 3정규화 적용 )
2. sequence 부여
3. EXTRACT(MONTH FROM data)
4. inner join / left join
5. graoup by / with rollup
6. month(now()) / data(now(), interval -1 month)





