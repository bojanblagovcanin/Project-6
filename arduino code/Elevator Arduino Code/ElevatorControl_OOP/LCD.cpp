/*!
 * @file LCD.cpp
 * @brief Michael Galle's Elevator Controller API
 * @copyright Michael Galle
 *
 * @author [Michael Galle]
 * @version V1.0
 * REQUIRED LIBRARY: LiquidCrystal.zip --- To install slect:  Sketch -> Include Library -> Add .ZIP Library (add .zip)
 */

#include "LCD.h"

LCD::LCD() : lcdObj(rs, en, d4, d5, d6, d7)                 // Constructor  IMPORTANT: The 'new' keyword does not exist in Arduino so to instantiate an object within a class you must use an 'initializer list' (see: http://arduinoetcetera.blogspot.com/2011/01/classes-within-classes-initialiser.html)
{												

}

LCD::~LCD() {									// Destructor

}


void LCD::setup()  
{
	lcdObj.begin(16, 2);                                       // set up the LCD's number of columns (16) and rows (2):
}

void LCD::loop(uint16_t dist) {
	lcdObj.setCursor(0, 1);                              // Set cursor to column 0, line 1  (line 1 is second row since counting starts at 0)
	lcdObj.print(dist);
	lcdObj.print("mm");
}