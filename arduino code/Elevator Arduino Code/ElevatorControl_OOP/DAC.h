/*!
 * @file DAC.h
 * @brief Michael Galle's Elevator Controller API
 * @copyright Michael Galle
 *
 * @author [Michael Galle]
 * @version V1.0
 *
 */

#ifndef DAC_H
#define DAC_H

#include <SPI.h>                            /* SPI protocol functions */

// DAC
#define CS 10                               // pin 10 is used as SPI CS pin for DAC 
#define ctrA 0x0003                         // Control bits are '0011'  - Control bits for selecting DAC A (see spec sheet for MCP4912-E/P-ND) 
#define ctrB 0x000B                         // Control bits are '1011'  - Control bits for selecting DAC B (see spec sheet for MCP4912-E/P-ND)

class DAC {
public:
	DAC();									// Contructor
	~DAC();									// Destructor
	void setup();
	void loop();
	void initializeDAC();					 // Set up DAC
	void transferDAC(int data);				 // Transfer output voltage to DAC A and DAC B for Motor Control

private:
	// DAC variables
	int buffA;                               // Transmit buffer for DAC A
	int buffB;                               // Transmit buffer for DAC B
	int dat;                                 // Data - value of output voltage 

};



#endif