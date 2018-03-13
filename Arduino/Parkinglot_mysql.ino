

// Include required libraries
#include <Adafruit_CC3000.h>
#include <ccspi.h>
#include <SPI.h>
#include <string.h>
#include "utility/debug.h"
#include "utility/socket.h"

#include<stdlib.h>

// Define CC3000 chip pins
#define ADAFRUIT_CC3000_IRQ   3
#define ADAFRUIT_CC3000_VBAT  5
#define ADAFRUIT_CC3000_CS    10

// Buffer for float to String conversion
// The conversion goes from a float value to a String with two numbers after the decimal.  That means a buffer of size 10 can accommodate a float value up to 999999.99 in order for the last entry to be \0
char buffer[10];

// WiFi network (change with your settings !)
#define WLAN_SSID       "Seonjeong"
#define WLAN_PASS       "zzzzzzzz"
#define WLAN_SECURITY   WLAN_SEC_WPA2 // This can be WLAN_SEC_UNSEC, WLAN_SEC_WEP, WLAN_SEC_WPA or WLAN_SEC_WPA2

const unsigned long
dhcpTimeout     = 60L * 1000L, // Max time to wait for address from DHCP
connectTimeout  = 15L * 1000L, // Max time to wait for server connection
responseTimeout = 15L * 1000L; // Max time to wait for data from server

uint32_t   t;
Adafruit_CC3000 cc3000 = Adafruit_CC3000(ADAFRUIT_CC3000_CS, ADAFRUIT_CC3000_IRQ, ADAFRUIT_CC3000_VBAT,
SPI_CLOCK_DIV2);

// PHP's server IP, port, and repository (change with your settings !)
uint32_t ip = cc3000.IP2U32(172,20,10,2);
//MAKE SURE TO SET THIS TO THE FOLDER YOU ARE USING IN htdocs FOR THE SERVER SIDE FILES
String repository = "/";

Adafruit_CC3000_Client client;

 int echoPin = 8;
int trigPin = 7;
int led = A2;
String ch;

void setup(void)
{


   Serial.begin(115200);
   pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
    pinMode(led,OUTPUT);
  Serial.print(F("Initializing..."));
  if(!cc3000.begin()) {
    Serial.println(F("failed. Check your wiring?"));
    return;
  }

  Serial.print(F("OK.\r\nConnecting to network..."));
  cc3000.connectToAP(WLAN_SSID, WLAN_PASS, WLAN_SECURITY);
  Serial.println(F("connected!"));

  Serial.print(F("Requesting address from DHCP server..."));
  for(t=millis(); !cc3000.checkDHCP() && ((millis() - t) < dhcpTimeout); delay(500)) {
    Serial.println("....waiting");
  }
  if(cc3000.checkDHCP()) {
    Serial.println(F("OK"));
  } 
  else {
    Serial.println(F("failed"));
    return;
  }
}

void loop(void)
{

    float duration, distance;

  // 초음파를 보낸다. 다 보내면 echo가 HIGH 상태로 대기하게 된다.
  digitalWrite(trigPin, HIGH);
  delay(10);
  digitalWrite(trigPin, LOW);

  // echoPin 이 HIGH를 유지한 시간을 저장 한다.
  duration = pulseIn(echoPin, HIGH);
  // HIGH 였을 때 시간(초음파가 보냈다가 다시 들어온 시간)을 가지고 거리를 계산 한다.
  distance = ((float)(340 * duration) / 10000) / 2;
digitalWrite(led, HIGH);
ch="1";
  Serial.print(distance);
  Serial.println("cm");
  // 수정한 값을 출력

  if(distance<5){
    digitalWrite(led,LOW);ch="NULL";}
    
  //Open Socket
  Serial.println("...Connecting to server");
      client = cc3000.connectTCP(ip, 80);

  // Send request
  if (client.connected()) {
    Serial.println("Connected"); 
    String request = "GET "+ repository + "parkingupdate.php?num=A1&ch=" + ch + "\r\nHTTP/1.1";
    Serial.print("...Sending request:");
    Serial.println(request);
    send_request(request);
  } 
  else {
    Serial.println(F("Connection failed"));    
    return;
  }
  Serial.println("...Reading response");
  show_response();

  Serial.println(F("Cleaning up..."));
  //client.close();
  //wait some amount of time before sending temperature/humidity to the PHP service.
  delay(5000);

}
/*******************************************************************************
 * send_request
 ********************************************************************************/
bool send_request (String request) {
  // Transform to char
  char requestBuf[request.length()+1];
  request.toCharArray(requestBuf,request.length()); 
  // Send request
  if (client.connected()) {
    client.fastrprintln(requestBuf); 
  } 
  else {
    Serial.println(F("Connection failed"));    
    return false;
  }
  return true;
  free(requestBuf);
}
/*******************************************************************************
 * show_response
 ********************************************************************************/
void show_response() {
  Serial.println(F("-------------------------------------"));
  while (client.available()) {
    // Read answer and print to serial debug
    char c = client.read();
    Serial.print(c);
  }
}

