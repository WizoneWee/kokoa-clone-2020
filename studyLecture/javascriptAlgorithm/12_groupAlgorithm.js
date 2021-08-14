// [?] 컬렉션 형대의 테어티를 특정 키 값으로 그룹화

// 그룹 알고리즘(Group Algorithm) : 특정 키 값에 해당하는 그룹화된 합계 리스트 만들기
(function () {
  // [1] Input : 테스용 레코드 JSON 배열
  var records = [
    { Name: "RADIO", Quantity: 3 },
    { Name: "TV", Quantity: 1 },
    { Name: "RADIO", Quantity: 2 },
    { Name: "DVD", Quantity: 4 },
  ]; // 입력 데이터
  var group = []; // 출력 데어터
  var N = records.length; // 의사 코드

  // [2] Process : Group Algorithm(Sort -> Sum -> Group)
  // [A] 그룹 정렬 : Sort
  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      if (records[i].Name > records[j].Name) {
        var tmp = records[i];
        records[i] = records[j];
        records[j] = tmp; // Swap
      }
    }
  }
  // [B] 그룹 소계 : Group
  var groupCount = 0; // 그룹수
  var subtotal = 0; // 소계
  var newRecords = JSON.parse(JSON.stringify(records)); // Deep Copy
  for (let i = 0; i < N; i++) {
    subtotal += newRecords[i].Quantity; // 같은 상품며의 수량을 누적(sum)
    if (
      i + 1 == N || // 단락(short circutin)이면 아래 조건 무시
      newRecords[i].name != newRecords[i + 1].Name
    ) {
      group.push(newRecords[i]);
      //[i] 다음 레코드가 없거나, 현재 레코드와 다음 레코드가 다르면 저장
      group[groupCount].Name = newRecords[i].Name; // 한 그룹의 키(key) 저장
      group[groupCount].Quantity = subtotal; // 소계
      groupCount++; // 그룹 수 증가
      subtotal = 0; // 하나의 그룹이 완료되면 소계 초기화
    }
  }
  // [3] Output
  console.log("[1] 정렬된 원본 데이터 : ");
  for (let i = 0; i < N; i++) {
    console.log(records[i].Name + " - " + records[i].Quantity);
  }

  console.log("[2] 이름으로 그룹화된 데이터 : ");
  for (let i = 0; i < group.length; i++) {
    console.log(group[i].Name + " - " + group[i].Quantity);
  }
})();
