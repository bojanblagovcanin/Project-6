/*!
 * @file ElevatorControl_OOP.ino
 * @brief Michael Galle's Elevator Controller API - Object Oriented Version
 * @copyright Michael Galle
 * @author [Michael Galle]
 * references: https://paulmurraycbr.github.io/ArduinoTheOOWay.html, http://arduinoetcetera.blogspot.com/2011/01/classes-within-classes-initialiser.html
 * @version V1.1
 * REQUIRED: LIBRARY FROM ARDUINO LIBRARY MANAGER: mcp_can by coryjfowler (You can see examples in File > Examples > mcp_can)
 * REQUIRED: LIBRARY LiquidCrystal.zip --- To install slect:  Sketch -> Include Library -> Add .ZIP Library (add .zip)         
 */

#include "ElevatorController.h"

ElevatorController EC;                                     // Instantiate an Elevator controller object

void setup() { 
  EC.setup(); 
  attachInterrupt(digitalPinToInterrupt(INT_PIN), CAN_MSGRCVD_ISR, FALLING);      // Interrupt on falling edge of INT_PIN and call CAN_MSGRCVD() method of the ElevatorControl object  
  // Do not need to attach anything to the timer-based interrupt. It will automatically call ISR(TIMER1_COMPA_vect) when triggered. It is on a register external to the microcontroller.
  pinMode(0,INPUT_PULLUP);
}

// Timer-based Interrupt routine for timer1 (occurs at 0.25 Hz 0r 4 seconds) - This ISR is called when the timer-based interrupt is triggered and is exteral to the ElevatorController Object
ISR(TIMER1_COMPA_vect) {
    EC.flagTx = true;
}

// When message is received and the INT_PIN is triggered LOW, the interrupt calls this function
void CAN_MSGRCVD_ISR() {
    EC.flagRecv = true;                                                           // Set received flag to true - dealt with inside the loop
}

void loop() 
{
  EC.loop();
}
