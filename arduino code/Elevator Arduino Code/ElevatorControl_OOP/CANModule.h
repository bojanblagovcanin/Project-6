/*!
 * @file CANModule.h
 * @brief Michael Galle's Elevator Controller API
 * @copyright Michael Galle
 *
 * @author [Michael Galle]
 * @version V1.0
 * REQUIRED: LIBRARY FROM ARDUINO LIBRARY MANAGER: mcp_can by coryjfowler (You can see examples in File > Examples > mcp_can)
 */

#ifndef CAN_H
#define CAN_H

#include <SPI.h>                            /* SPI protocol functions */
#include <mcp_can.h>                        /* MCP2515 library installed as described above */
#include "LCD.h"

//SPI PINS (Used by CAN module - CAN module talks to Arduino via SPI)
#define SPI_CS_PIN 9                        // Pin 9 is selected as the SPI CS pin. The default pin is 10 but that is in use on the UNO
#define INT_PIN 2                           // Pin 2 is the interrupt pin used by the CAN module (SLAVE) to notify the MASTER (Arduino) that a message has arrived (MASTER must initiate communication by setting the CS pin LOW in order to get the data via SPI)
// Protocol for Elevator
#define TxID 0x101                          // CAN ID OF THIS DEVICE (Elevator Controller) - Raspberry Pi (0x100), Elevator Controller (this device (0x101)), Car controller (0x200), Floor 1 (0x201), Floor 2 (0x202), Floor 3 (0x203) 
#define DLC 1                               // Data length code in CAN (we only use one of the possible 8 bytes). This code can handle DLC from 1 to 8. 
#define FLOOR1  0x05                        // Floor 1 = 0x05, Floor 2 = 0x06,  Floor 3 = 0x07 (this is entered into txdata[0] - we only use one of the eight CAN message bytes)
#define FLOOR2  0x06
#define FLOOR3  0x07
// Motion tuning
#define diffMax 1500                        // Maximum difference between setpoint and distance measurement (Controlls the 1/e point on the dampening curve)
#define DAMPENER 2                          // Motion dampening parameter (larger n dampens faster)
#define A 1.5                               // Linear Gain on the difference measurement
#define MINHEIGHT 100                       // Below this height the Elevator Stops moving - SOFTWARE KILL SWITCH
#define MAXHEIGHT 1500                      // Above this height the Elevator stops moving - SOFTWARE KILL SWITCH
#define FLOOR1_SP 350                       // Floor 1 setpoint 300mm from bottom (sensor)
#define FLOOR2_SP 635                       // Floor 2 setpoint 700mm from bottom (sensor)
#define FLOOR3_SP 1220                      // Floor 3 setpoint 1000mm from bottom (sensor)
// Sets the care/don't care bits in the ID (11 bits long for Standard CAN) [first 4 nibbles] and first two bytes of data [last four nibbles]. Using this mask we care about all ID bits so that ID of a message must match a filter below.    
#define MASK0 0x07FF0000                    // Mask0 for Filter 0 and Filter 1
#define MASK1 0x07FF0000                    // Mask1 for Filters 2, 3,4 and 5 (there are only 6 filters total. See explanation at: https://forum.arduino.cc/t/mcp2515-can-filtering/506401 )
#define FILTER_SC 0x01000000                // Acceptance filter for ID 0x100 (Supervisory Controller - Raspberry Pi)
#define FILTER_EC 0x01010000                // Acceptance filter for ID 0x101 (Elevator Controller) -- comment out if only want to accept commands from Supervisory controller
#define FILTER_CC 0x02000000                // Acceptance filter for ID 0x200 (Car Controller)
#define FILTER_F1 0x02010000                // Acceptance filter for ID 0x201 (Floor 1 Controller)
#define FILTER_F2 0x02020000                // Acceptance filter for ID 0x202 (Floor 2 Controller)
#define FILTER_F3 0x02030000                // Acceptance filter for ID 0x203 (Floor 3 Controller)

class CANModule {
public:
	CANModule();							                // Contructor
	~CANModule();							                // Destructor
	void setup();
	void loop();
	void initializeCAN();                     // Set up CAN communications
	void transmitCAN();						            // Transmit CAN message
	void receiveCAN(LCD);					            // Receive CAN message

  // Getters and setters
  uint16_t getSetpoint();                   // Returns the value of the private variable 'setpoint'
  void setSetpoint(uint16_t);               // Sets the value of the private variable 'setpoint'
  byte getTxdata();                         // Get the first byte of data from txdata array (per our protocol) - modify if you want to use more than first byte
  void setTxdata(byte);                     // Set the first byte of data from txdata array (per our protocol) - modify if you want to use more than first byte 
	
private:
  uint16_t setpoint;					              // Distance in mm from the distance sensor to a given floor
  MCP_CAN mcp2515;						              // C++ Reference to an object passed to constructor via initializer list    
	byte txdata[8] = { 0, 0, 0, 0, 0, 0, 0, 0 };  // CAN message (8 bytes) - only use 1 data byte in our protocol 
	long unsigned int RxID;					          // ID of received message
	unsigned char len = 0;					          // DLC (length) of received message
	unsigned char rxdata[8] = { 0, 0, 0, 0, 0, 0, 0, 0 }; // Received data 
	char msgString[128];                      // Array to store and print the received string on the Serial Monitor
  
};

#endif