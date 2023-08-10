/*!
 * @file DistanceSensor.cpp
 * @brief Michael Galle's Elevator Controller API
 * @copyright Michael Galle
 *
 * @author [Michael Galle]
 * @version V1.0
 *
 */

#include "DistanceSensor.h"

DistanceSensor::DistanceSensor() {									// Constructor

}

DistanceSensor::~DistanceSensor() {									// Destructor

}

void DistanceSensor::setup() {
    initializeDistanceSensor();                             // Set up the Distance sensor
}

void DistanceSensor::loop() {

}

// Set up the Distance sensor
void DistanceSensor::initializeDistanceSensor() {
    Serial.println("Init sensor");
    sensor.begin(0x50);                                     // Set I2C sub-device address for the distance sensor - sensor has hex address 0x50
    sensor.setMode(Single, Low);                            // Single measurements in Low (+- 1 mm) precision mode  (High precision mode is too noisy)
    Serial.println("Completed Sensor init");
}