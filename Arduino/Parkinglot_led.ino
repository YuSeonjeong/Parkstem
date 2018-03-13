#include <SoftwareSerial.h>
SoftwareSerial XBee(4,5); 

int trig_1 = 8;
int echo_1 = 9;
int led_1 = A0;
int trig_2 = 10;
int echo_2 = 11;
int led_2 = A1;
int trig_3 = 12;
int echo_3 = 13;
int led_3 = A2;
char people = '0';
const int BUTTON_INT= 0; 
int count=0;
char people2='0';

void setup() {
  XBee.begin(9600);
  Serial.begin(9600);
  pinMode(trig_1,OUTPUT);
  pinMode(echo_1,INPUT);
  pinMode(led_1,OUTPUT);
  pinMode(trig_2,OUTPUT);
  pinMode(echo_2,INPUT);
  pinMode(led_2,OUTPUT);
  pinMode(trig_3,OUTPUT);
  pinMode(echo_3,INPUT);
  pinMode(led_3,OUTPUT);
  attachInterrupt(BUTTON_INT, swap, RISING);

}
void swap()
{
Serial.println("interrupt"); 

int count=digitalRead(led_1);
int count2=digitalRead(led_2);
int count3=digitalRead(led_3);

if(count==LOW){
  digitalWrite(led_1,HIGH);
  delay(500);

}
}

void loop() {
  
  digitalWrite(trig_1,LOW);
  digitalWrite(echo_1,LOW);
  delayMicroseconds(2);
  digitalWrite(trig_1,HIGH);
  delayMicroseconds(10);
  digitalWrite(trig_1,LOW);
  unsigned long duration_1 = pulseIn(echo_1,HIGH);
  
  digitalWrite(trig_2,LOW);
  digitalWrite(echo_2,LOW);
  delayMicroseconds(2);
  digitalWrite(trig_2,HIGH);
  delayMicroseconds(10);
  digitalWrite(trig_2,LOW);
  unsigned long duration_2 = pulseIn(echo_2,HIGH);
  
  digitalWrite(trig_3,LOW);
  digitalWrite(echo_3,LOW);
  delayMicroseconds(2);
  digitalWrite(trig_3,HIGH);
  delayMicroseconds(10);
  digitalWrite(trig_3,LOW); 
  unsigned long duration_3 = pulseIn(echo_3,HIGH);
    
  float distance_1 = duration_1 / 29.0 / 2.0;
  float distance_2 = duration_2 / 29.0 / 2.0;
  float distance_3 = duration_3 / 29.0 / 2.0;    

  Serial.print(distance_1);
  Serial.println("cm");
  Serial.print(distance_2);
  Serial.println("cm");
  Serial.print(distance_3);
  Serial.println("cm");

  if (distance_1 < 10 && distance_2 < 10 && distance_3 < 10) {
  digitalWrite(led_1, LOW);
  digitalWrite(led_2, LOW);
  digitalWrite(led_3, LOW);
  Serial.println("xxx");
  people='3';
  }
  
  if (distance_1 >= 10 && distance_2 >= 10 && distance_3 >= 10) {
  digitalWrite(led_1, HIGH);
  digitalWrite(led_2, HIGH);
  digitalWrite(led_3, HIGH);
  Serial.println("ooo");
  people='0';
  }

  if (distance_1 < 10 && distance_2 >= 10 && distance_3 >= 10) {
  digitalWrite(led_1, LOW);
  digitalWrite(led_2, HIGH);
  digitalWrite(led_3, HIGH);
  Serial.println("xoo");
  people='1';
  }
  
  if (distance_1 >= 10 && distance_2 < 10 && distance_3 < 10) {
  digitalWrite(led_1, HIGH);
  digitalWrite(led_2, LOW);
  digitalWrite(led_3, LOW);
  Serial.println("oxx");
  people='2';
  }

  if (distance_1 >= 10 && distance_2 < 10 && distance_3 >= 10) {
  digitalWrite(led_1, HIGH);
  digitalWrite(led_2, LOW);
  digitalWrite(led_3, HIGH);
  Serial.println("oxo");
  people='1';
  }

  if (distance_1 < 10 && distance_2 >= 10 && distance_3 < 10) {
  digitalWrite(led_1, LOW);
  digitalWrite(led_2, HIGH);
  digitalWrite(led_3, LOW);
  Serial.println("xox");
  people='2';
  }

  if (distance_1 >= 10 && distance_2 >= 10 && distance_3 < 10) {
  digitalWrite(led_1, HIGH);
  digitalWrite(led_2, HIGH);
  digitalWrite(led_3, LOW);
  Serial.println("oox");
  people='1';
  }

  if (distance_1 < 10 && distance_2 < 10 && distance_3 >= 10) {
  digitalWrite(led_1, LOW);
  digitalWrite(led_2, LOW);
  digitalWrite(led_3, HIGH);
  Serial.println("xxo");
  people='2';
  }
      XBee.print(people);
  Serial.println(people);
  Serial.println("-----------------------");
  delay(500); 
} 
