// Lista extensa de Ethertypes válidos para Ethernet
// Fuente: https://www.iana.org/assignments/ieee-802-numbers/ieee-802-numbers.xhtml

export const ETHERTYPES_VALIDOS = [
  "0800", // IPv4
  "0806", // ARP
  "0842", // Wake-on-LAN
  "22F3", // IETF TRILL Protocol
  "6003", // DECnet Phase IV
  "8035", // RARP
  "809B", // AppleTalk (Ethertalk)
  "80F3", // AppleTalk AARP
  "8100", // VLAN-tagged frame (IEEE 802.1Q)
  "8137", // IPX
  "86DD", // IPv6
  "8808", // Ethernet flow control
  "8809", // Slow Protocols (LACP)
  "8819", // CobraNet
  "8847", // MPLS unicast
  "8848", // MPLS multicast
  "8863", // PPPoE Discovery Stage
  "8864", // PPPoE Session Stage
  "8870", // Jumbo Frames
  "887B", // HomePlug 1.0 MME
  "888E", // EAP over LAN (IEEE 802.1X)
  "8892", // PROFINET
  "889A", // HyperSCSI (SCSI over Ethernet)
  "88A2", // ATA over Ethernet
  "88A4", // EtherCAT Protocol
  "88A8", // Provider Bridging (IEEE 802.1ad)
  "88AB", // EtherNet/IP
  "88CC", // LLDP
  "88CD", // SERCOS III
  "88E1", // HomePlug AV MME
  "88E3", // Media Redundancy Protocol (MRP)
  "88E5", // MAC security (IEEE 802.1AE)
  "88F7", // Precision Time Protocol (PTP)
  "8902", // IEEE 802.1ag Connectivity Fault Management (CFM)
  "8906", // Fibre Channel over Ethernet (FCoE)
  "8914", // FCoE Initialization Protocol
  "8915", // RDMA over Converged Ethernet (RoCE)
  "892F", // High-availability Seamless Redundancy (HSR)
  "9000", // Ethernet Configuration Testing Protocol
  // Puedes agregar más según necesidad
];

// Lista de Ethertypes válidos con descripción
export const ETHERTYPES_INFO = [
  { value: "0800", desc: "IPv4" },
  { value: "0806", desc: "ARP" },
  { value: "0842", desc: "Wake-on-LAN" },
  { value: "22F3", desc: "IETF TRILL Protocol" },
  { value: "6003", desc: "DECnet Phase IV" },
  { value: "8035", desc: "RARP" },
  { value: "809B", desc: "AppleTalk (Ethertalk)" },
  { value: "80F3", desc: "AppleTalk AARP" },
  { value: "8100", desc: "VLAN-tagged frame (IEEE 802.1Q)" },
  { value: "8137", desc: "IPX" },
  { value: "86DD", desc: "IPv6" },
  { value: "8808", desc: "Ethernet flow control" },
  { value: "8809", desc: "Slow Protocols (LACP)" },
  { value: "8819", desc: "CobraNet" },
  { value: "8847", desc: "MPLS unicast" },
  { value: "8848", desc: "MPLS multicast" },
  { value: "8863", desc: "PPPoE Discovery Stage" },
  { value: "8864", desc: "PPPoE Session Stage" },
  { value: "8870", desc: "Jumbo Frames" },
  { value: "887B", desc: "HomePlug 1.0 MME" },
  { value: "888E", desc: "EAP over LAN (IEEE 802.1X)" },
  { value: "8892", desc: "PROFINET" },
  { value: "889A", desc: "HyperSCSI (SCSI over Ethernet)" },
  { value: "88A2", desc: "ATA over Ethernet" },
  { value: "88A4", desc: "EtherCAT Protocol" },
  { value: "88A8", desc: "Provider Bridging (IEEE 802.1ad)" },
  { value: "88AB", desc: "EtherNet/IP" },
  { value: "88CC", desc: "LLDP" },
  { value: "88CD", desc: "SERCOS III" },
  { value: "88E1", desc: "HomePlug AV MME" },
  { value: "88E3", desc: "Media Redundancy Protocol (MRP)" },
  { value: "88E5", desc: "MAC security (IEEE 802.1AE)" },
  { value: "88F7", desc: "Precision Time Protocol (PTP)" },
  { value: "8902", desc: "IEEE 802.1ag Connectivity Fault Management (CFM)" },
  { value: "8906", desc: "Fibre Channel over Ethernet (FCoE)" },
  { value: "8914", desc: "FCoE Initialization Protocol" },
  { value: "8915", desc: "RDMA over Converged Ethernet (RoCE)" },
  { value: "892F", desc: "High-availability Seamless Redundancy (HSR)" },
  { value: "9000", desc: "Ethernet Configuration Testing Protocol" },
  // Puedes agregar más según necesidad
];

// Función para validar Ethertype
export function esEthertypeValido(tipo) {
  return ETHERTYPES_VALIDOS.map(e => e.toUpperCase()).includes((tipo || "").toUpperCase());
}

// Función que retorna mensaje de error personalizado para Ethertype
export function validarEthertype(tipo) {
  if (!/^[0-9A-Fa-f]{4}$/.test(tipo)) {
    return "Tipo debe ser 4 dígitos hex";
  }
  if (!esEthertypeValido(tipo)) {
    return "Ethertype no estándar. Consulta la lista de válidos o usa uno común como 0800 (IPv4), 0806 (ARP), 86DD (IPv6), 8100 (VLAN), 88CC (LLDP), 8847 (MPLS unicast), 8848 (MPLS multicast).";
  }
  // Si existe info, no mostrar error
  return null;
}
