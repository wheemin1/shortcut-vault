// 포토샵 데이터 한국어 인코딩 테스트
const fs = require('fs');
const path = require('path');

console.log('🧪 포토샵 데이터 한국어 인코딩 테스트 시작...\n');

try {
  // 포토샵 JSON 파일 읽기
  const photoshopPath = path.join(__dirname, 'src', 'data', 'photoshop.json');
  const photoshopData = JSON.parse(fs.readFileSync(photoshopPath, 'utf8'));
  
  console.log('✅ JSON 파일 파싱 성공');
  console.log(`📊 총 ${photoshopData.length}개의 단축키 데이터 로드됨`);
  
  // 한국어가 포함된 샘플 데이터 확인
  const koreanSamples = photoshopData.slice(0, 5).map(item => ({
    id: item.id,
    keyCombo: item.keyCombo,
    description: item.description,
    hasKorean: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(item.description),
    hasEnglish: /\([^)]+\)/.test(item.description)
  }));
  
  console.log('\n🔍 샘플 데이터 분석:');
  koreanSamples.forEach(sample => {
    console.log(`  ${sample.id}: ${sample.keyCombo} - ${sample.description}`);
    console.log(`     한국어: ${sample.hasKorean ? '✅' : '❌'} | 영어: ${sample.hasEnglish ? '✅' : '❌'}`);
  });
  
  // 전체 데이터 검증
  const allValid = photoshopData.every(item => 
    /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(item.description) && 
    /\([^)]+\)/.test(item.description)
  );
  
  console.log(`\n📈 전체 데이터 검증: ${allValid ? '✅ 모든 항목이 한국어(영어) 형식' : '❌ 일부 항목에 문제가 있음'}`);
  
  // 카테고리별 분석
  const categories = [...new Set(photoshopData.map(item => item.category))];
  console.log(`\n📂 카테고리: ${categories.join(', ')}`);
  
  console.log('\n🎉 포토샵 데이터 테스트 완료!');
  
} catch (error) {
  console.error('❌ 테스트 실패:', error.message);
}
