# OTT_Server
OTT 서버 리팩토링 프로젝트

## **커밋 메세지 정리**

- [FIX] : 버그, 오류 해결
- [ADD] : Feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 시
- [FEAT] : 새로운 기능 구현
- [CHORE] : 코드 수정, 내부 파일 수정

## 플로우

- 이슈 생성
- 생성된 이슈 번호로 브랜치 따서 작업
- 브랜치명 예시 : feat/#2
- pull request
  
## Cloud Service 연결 방법
1. https://cloud.google.com/sdk/docs/install?hl=ko 로 Google Cloud SDK 설치
2. 설치한 SDK 실행해서 로그인 (수영 계정으로 설정되어있어서 필요시 수영 구글 계정으로 로그인 하기!)
3. Storage를 사용하는 프로젝트로 선택
4. gcloud auth application-default login 입력해서 또 로그인 실행 (2번과 동일)
- 참고 링크: https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-storage?hl=ko
- 이메일: kipddd@gmail.com, 비밀번호: dudgus931219!

## 환경변수 (.env) 파일
PORT=5000
DB_NAME = root  // 로컬에 맞게 변경
DB_PW = 1234    // 로컬에 맞게 변경
COOKIE_SECRET=cookiesecret
GCLOUD_STORAGE_BUCKET = ott-server
PROJECT_ID = eyear-347306
