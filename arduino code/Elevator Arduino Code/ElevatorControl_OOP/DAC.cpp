/*!
 * @file DAC.cpp
 * @brief Michael Galle's Elevator Controller API
 * @copyright Michael Galle
 *
 * @author [Michael Galle]
 * @version V1.0
 *
 */

#include "DAC.h"

DAC::DAC()                                                  // Constructor - No code 
{}

DAC::~DAC()                                                 // Destructor - No code
{}

void DAC::setup()                                           // Set up the DAC
{
    initializeDAC();                                        
}

void DAC::loop()                                            // loop function for DAC (empty)
{}

// Set up the DAC
void DAC::initializeDAC() {
    pinMode(CS, OUTPUT);                                    // Set the CS pin for DAC to output (DAC uses SPI so it needs a chip select pin)
    digitalWrite(CS, HIGH);                                 // Set CS pin high 
    //SPI.setBitOrder(MSBFIRST);                            // Alternative LSBFIRST  - Data sheet indicates to clock in the Four config bit first followed by data bits - meaning MSBFIRST is the operation 
}

// Transfer output voltage to DAC A and DAC B for Motor Control
void DAC::transferDAC(int data) {
    buffA = ctrA << 12;                                         // Reset buffer values to clear data bits - Reminder: buff = 1011 0000 0000 0000 (upper 4 bits are control bits - shift to the left)
    buffB = ctrB << 12;                                         // Reset buffer values to clear data bits

    if (data > 0) {
        // DAC A is positive and DAC B is zero
        data = data << 2;                                       // Data values (D0 - D9) is shifted left by 2 bits in the register since the last bits (X1 and X0) are not used
        // Registers look like  C3 C2 C1 C0 D9 D8 D7 D6 D5 D4 D3 D2 D1 D0 X1 X0
        buffA = buffA | data;                                   // bitwise 'or' combines the buff and data
        // buffB is unchanged with data value of zero
    }
    else if (data < 0) {
        // DAC B is positive and DAC A is zero
        data = data * (-1);                                     // Set data to a positive value but now DAC B is positive relative to DAC A (which is set to zero) 
        data = data << 2;                                       // Data values (D0 - D9) is shifted left by 2 bits in the register since the last bits (X1 and X0) are not used
        // Registers look like  C3 C2 C1 C0 D9 D8 D7 D6 D5 D4 D3 D2 D1 D0 X1 X0 (See MCP4912-EP-ND data sheet on page 24)
        buffB = buffB | data;                                   // bitwise 'or' combines the buff and data
        // buffA is unchanged with data value of zero                                                                       
    }
    else {
        // buffA and buffB both remain at zero
    }

    // Note: LDAC (latch DAC input) - the LDAC pin is connected to LOW (ground) so that Vout A and Vout B are updated at the same time (This PIN is not connected on the current board so we actually do this one at a time)
    // Set registers for DAC A
    digitalWrite(CS, LOW);                                      // Transfer new values to register (by setting the CS pin LOW)
    SPI.transfer(highByte(buffA));                              // Set the first byte (high bits)
    SPI.transfer(lowByte(buffA));                               // Set the last byte (low bits)
    digitalWrite(CS, HIGH);                                     // Stop data transfer and output voltage value set in register

    // Set registers for DAC B
    digitalWrite(CS, LOW);                                      // Transfer new values to register (by setting the CS pin LOW)
    SPI.transfer(highByte(buffB));                              // Set the first byte (high bits)
    SPI.transfer(lowByte(buffB));                               // Set the last byte (low bits)
    digitalWrite(CS, HIGH);                                     // Stop data transfer and output voltage value set in register
}
