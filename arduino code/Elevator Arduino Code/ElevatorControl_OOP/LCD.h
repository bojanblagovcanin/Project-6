/*!
 * @file LCD.h
 * @brief Michael Galle's Elevator Controller API
 * @copyright Michael Galle
 *
 * @author [Michael Galle]
 * @version V1.0
 * REQUIRED LIBRARY: LiquidCrystal.zip --- To install slect:  Sketch -> Include Library -> Add .ZIP Library (add .zip)
 */

#ifndef LCD_H
#define LCD_H


#include <SPI.h>                            /* SPI protocol functions */
#include <LiquidCrystal.h>                  /* Output data to liquid crystal display */

// LCD Display
const int rs = 8, en = 7, d4 = 5, d5 = 4, d6 = 3, d7 = 6;	// Pinout connections to 1602 Liquid Crystal Display 


class LCD {
public:
	LCD();					 // Contructor
	~LCD();					 // Destructor
	void setup();
	void loop(uint16_t);

	// LCD Setup
	LiquidCrystal lcdObj;	// C++ reference passed to constructor to initialize the values and construct a LiquidCrystal object

private:
	
};







#endif