/*!
 * @file ElevatorController.h
 * @brief Michael Galle's Elevator Controller API
 * @copyright Michael Galle 
 *
 * @author [Michael Galle]
 * @version V1.0
 *
 */

#ifndef ELEVATORCONTROLLER_H
#define ELEVATORCONTROLLER_H

#include "Arduino.h"
#include "CANModule.h"
#include "DistanceSensor.h"
#include "DAC.h"
#include "LCD.h"

class ElevatorController {
public:

	void setup();
	void loop();

	ElevatorController();					          // Contructor
	~ElevatorController();					        // Destructor

	void initializeTimer();					        // Set up timer-based interrupt on the ElevatorController (Arduino UNO) for transmission of current floor every 2 seconds
	void Move(uint16_t sp);					        // Move to setpoint distance (floor)

	volatile boolean flagRecv;              // Flag used to indicate message received in the loop via interrupt --> Interrupt flag for receive (CAN module, a SPI SLAVE, uses an interrupt on INT_PIN to ask the Arduino (SPI MASTER) to initiate communication)
	volatile boolean flagTx;                // flag for timer-based transmit interrupt --> Interrupt flag for timer-based interrupt for transmit process (UNO should broadcast the current floor on the bus every few seconds)

private: 
  // Motion variables                     // Set dynamic parameters to smooth out motion: difference = difference * A e^(-a * difference)
	float a;                                // Exponential dampening on the difference measurement - via exponential (see Move() function)
  uint16_t dist;                          // Distance in mm from the distance sensor
	int difference;                         // Difference in mm from setpoint (floor). A positive value is above the setpoint distance (floor) and a negative value is below.

  // Instantiate sub-objects of the ElevatorController
  CANModule CM;                           // CAN module object                      
	DistanceSensor DSM;                     // Distance Sensor module object
	DAC DM;                                 // DAC module object
	LCD LCDM;                               // LCD module object

};

#endif
