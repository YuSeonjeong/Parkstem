#include <Servo.h>

Servo myservo_A;       // 입구 차량차단기
Servo myservo_B;       // 입구 차량차단기
int pos_A = 0;          // 입구 차량차단기 각도값
int pos_B = 0;          // 출구 차량차단기 각도값
int analogPin_A_1=0;    // 입구 적외선 센서 1번을 아날로그 A0번 핀에 연결
int analogPin_A_2=1;    // 입구 적외선 센서 2번을 아날로그 A1번 핀에 연결
int analogPin_B_1=2;    // 출구 적외선 센서 1번을 아날로그 A2번 핀에 연결
int analogPin_B_2=3;    // 출구 적외선 센서 2번을 아날로그 A3번 핀에 연결
int up_A=0;             // 입구 차량차단기 업 상태
int stopstop_A=0;       // 입구 차량차단기 정지 상태
int up_B=0;             // 출구 차량차단기 업 상태
int stopstop_B=0;       // 출구 차량차단기 정지 상태

void setup(){
  Serial.begin(9600);
  myservo_A.attach(8);       // 입구 차량차단기를 디지털 핀 8번 핀에 연결
  myservo_B.attach(9);       // 출구 차량차단기를 디지털 핀 9번 핀에 연결
}

void loop(){
  int volt_A_1 = analogRead(analogPin_A_1);
  int volt_A_2 = analogRead(analogPin_A_2);
  int volt_B_1 = analogRead(analogPin_B_1);
  int volt_B_2 = analogRead(analogPin_B_2);

{
  if ((volt_A_1>=300)&&(volt_A_2>=300)) {
    Serial.println("come in");
    stopstop_A=stopstop_A+1;

    if(stopstop_A==1){
    for(pos_A = 90; pos_A > 0; pos_A -= 1)       // 90도에서 180도로 이동
    {                                           // 이동할때 각도는 1도씩
      myservo_A.write(pos_A);                    // 'pos_A'변수의 위치로 서보를 이동시킵니다.
      delay(15);                                // 서보 명령 간에 15ms를 기다립니다.
      }}

      if(stopstop_A>1){
        myservo_A.write(0);
        }
      up_A=1;
   }
   
   else if (up_A==1){
    for(pos_A = 0; pos_A < 90; pos_A += 1) 
    {
      myservo_A.write(pos_A);
      delay(15);
      }

      up_A=0;
      stopstop_A=0;
    }
    
    else {
    Serial.print("A_1 : ");
    Serial.println(volt_A_1);
    Serial.print("A_2 : ");
    Serial.println(volt_A_2);
    }
}

{
  if ((volt_B_1>=300)&&(volt_B_2>=300)) {
    Serial.println("step out");
    Serial.println("---------------------------");
    stopstop_B=stopstop_B+1;

    if(stopstop_B==1){
    for(pos_B = 90; pos_B > 0; pos_B -= 1)  // 90도에서 0도로 이동
    {                                   // 이동할때 각도는 1도씩
      myservo_B.write(pos_B);              // 'pos_B'변수의 위치로 서보를 이동시킵니다.
      delay(15);                       // 서보 명령 간에 15ms를 기다립니다.
      }}

      if(stopstop_B>1){
        myservo_B.write(0);
        }
      up_B=1;
   }
   
   else if (up_B==1){
    for(pos_B = 0; pos_B < 90; pos_B += 1)
    {
      myservo_B.write(pos_B);
      delay(15);
      }
      
      up_B=0;
      stopstop_B=0;
    }
    
    else {
    Serial.print("B_1 : ");
    Serial.println(volt_B_1);
    Serial.print("B_2 : ");
    Serial.println(volt_B_2);
    Serial.println("---------------------------");
    }
}
  delay(1000);
}

