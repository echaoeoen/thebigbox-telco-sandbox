import Driver from './driver/driver'
import DriverDefault from './driver/driver.default'
const d:Driver = new DriverDefault()
d.registry().handler().serve()