/*!
 * @file DistanceSensor.h
 * @brief Michael Galle's Elevator Controller API
 * @copyright Michael Galle
 *
 * @author [Michael Galle]
 * @version V1.0
 *
 */

#ifndef DISTANCE_H
#define DISTANCE_H

#include "Wire.h"                           /* I2C protocol functions */
#include "DFRobot_VL53L0X.h"                /* Laser rangefinder functions */

class DistanceSensor {
public:
	DistanceSensor();						              // Contructor
	~DistanceSensor();						            // Destructor
	void setup();
	void loop();
	void initializeDistanceSensor();		      // Set up the Distance sensor

	DFRobotVL53L0X sensor;                    // Distance sensor object

private:
};


#endif