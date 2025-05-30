# GitHub 연결 및 Netlify 배포 가이드

## 1️⃣ GitHub 리포지토리 생성 후 실행할 명령어

```bash
# GitHub 리포지토리를 원격으로 추가 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/shortcut-vault-app.git

# 메인 브랜치를 원격으로 푸시
git push -u origin main
```

## 2️⃣ Netlify 배포

### 방법 1: Netlify 웹사이트에서 배포
1. [netlify.com](https://netlify.com)에 로그인
2. "New site from Git" 클릭
3. GitHub 연결 후 `shortcut-vault-app` 리포지토리 선택
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. "Deploy site" 클릭

### 방법 2: Netlify CLI로 배포
```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 빌드
npm run build

# 배포
netlify deploy --prod --dir dist
```

## 3️⃣ 배포 완료 후

✅ **완료!** 
- GitHub: 코드 저장소 관리
- Netlify: 자동 배포 및 호스팅
- 코드 푸시 시 자동으로 재배포됨

## 4️⃣ 유용한 추가 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 새로운 기능 추가 후 배포
git add .
git commit -m "feat: 새로운 기능 추가"
git push
```
