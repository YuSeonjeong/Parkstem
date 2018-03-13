#include <SoftwareSerial.h>

SoftwareSerial XBee(4, 5); 

int data1 = 8;
int latch1 = 9;
int clock1 = 10;
int a=0;

byte num[] = {0b011000000,0b11111001,0b10100100,0b10110000,0b10011001,0b10010010,
0b10000010,0b11011000,0b10000000,0b10011000}; //0~9

void setup() {
  Serial.begin(9600);
  XBee.begin(9600); 
  pinMode(latch1, OUTPUT);
  pinMode(clock1, OUTPUT);
  pinMode(data1, OUTPUT);
  }
 
  void loop() {
    if(XBee.available()){
      char data = XBee.read();
         Serial.println(data);
      if(data=='0') {
        a=6;
        }

        else if (data=='1')
        {
          a=5;
          }

          else if(data=='2')
          {
            a=4;}

            else if(data=='3')
            {
              a=3;}

digitalWrite(latch1, LOW); // shift out the bits:
    shiftOut(data1, clock1, MSBFIRST, num[a]);
    digitalWrite(latch1, HIGH);   

    delay(300);
    }
}
