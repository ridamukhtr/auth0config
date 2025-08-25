import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';

const PropertyInspectionForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    inspectionDate: new Date().toLocaleDateString(),
    inspector: '',
    status: 'pending',
    priority: 'medium',
    description: '',
    roomCount: '',
    area: '',
    condition: 'good',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  // Validation rules
  //   const validateForm = () => {
  //     const newErrors = {};

  //     if (!formData.propertyName.trim()) {
  //       newErrors.propertyName = 'Property name is required';
  //     }

  //     if (!formData.address.trim()) {
  //       newErrors.address = 'Address is required';
  //     }

  //     if (!formData.inspector) {
  //       newErrors.inspector = 'Inspector selection is required';
  //     }

  //     if (formData.roomCount && parseInt(formData.roomCount) < 0) {
  //       newErrors.roomCount = 'Room count cannot be negative';
  //     }

  //     if (formData.area && parseFloat(formData.area) <= 0) {
  //       newErrors.area = 'Area must be greater than 0';
  //     }

  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  // Validation rules - FIXED VERSION
  const validateForm = () => {
    const newErrors = {};

    if (!formData.propertyName.trim()) {
      newErrors.propertyName = 'Property name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.inspector) {
      newErrors.inspector = 'Inspector selection is required';
    }

    // FIXED: Check if roomCount is not empty before parsing
    if (formData.roomCount && !isNaN(parseInt(formData.roomCount))) {
      if (parseInt(formData.roomCount) < 0) {
        newErrors.roomCount = 'Room count cannot be negative';
      }
    }

    // FIXED: Check if area is not empty before parsing
    if (formData.area && !isNaN(parseFloat(formData.area))) {
      if (parseFloat(formData.area) <= 0) {
        newErrors.area = 'Area must be greater than 0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form field changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  // Mock image picker
  const handleImagePick = source => {
    Alert.alert(
      'Image Picker',
      `Would open ${source} picker in real implementation`,
      [{text: 'OK'}],
    );
  };

  // Form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors in the form');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Inspection created successfully!', [
        {text: 'OK'},
      ]);
      console.log('Form data:', formData);
    }, 1500);
  };

  // Reset form
  const handleReset = () => {
    Alert.alert('Reset Form', 'Are you sure you want to reset all fields?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => {
          setFormData({
            propertyName: '',
            address: '',
            inspectionDate: new Date().toLocaleDateString(),
            inspector: '',
            status: 'pending',
            priority: 'medium',
            description: '',
            roomCount: '',
            area: '',
            condition: 'good',
            notes: '',
          });
          setErrors({});
          setImages([]);
        },
      },
    ]);
  };

  // Simple styles
  const styles = {
    mainContainer: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
    },
    section: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 16,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#333',
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: 'white',
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
    },
    halfInput: {
      flex: 1,
    },
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    mediaButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
    },
    mediaButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#007AFF',
      padding: 12,
      borderRadius: 8,
      gap: 8,
    },
    mediaButtonText: {
      color: 'white',
      fontWeight: '500',
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
      marginTop: 24,
    },
    button: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderRadius: 8,
      gap: 8,
    },
    resetButton: {
      backgroundColor: '#ff3b30',
    },
    submitButton: {
      backgroundColor: '#34c759',
    },
    resetButtonText: {
      color: 'white',
      fontWeight: '600',
    },
    submitButtonText: {
      color: 'white',
      fontWeight: '600',
    },
    datePickerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      backgroundColor: 'white',
    },
    dateText: {
      fontSize: 16,
      color: '#333',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: 'white',
    },
    picker: {
      height: 50,
    },
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>New Property Inspection</Text>
          <Text style={styles.subtitle}>Complete all required fields</Text>
        </View>

        {/* Basic Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Property Name *</Text>
            <TextInput
              style={[styles.input, errors.propertyName && styles.inputError]}
              placeholder="Enter property name"
              value={formData.propertyName}
              onChangeText={text => handleInputChange('propertyName', text)}
            />
            {errors.propertyName && (
              <Text style={styles.errorText}>{errors.propertyName}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={[styles.input, errors.address && styles.inputError]}
              placeholder="Enter full address"
              value={formData.address}
              onChangeText={text => handleInputChange('address', text)}
              multiline
            />
            {errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}
          </View>
        </View>

        {/* Inspection Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspection Details</Text>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Inspection Date</Text>
              <TouchableOpacity style={styles.datePickerButton}>
                <Text style={styles.dateText}>{formData.inspectionDate}</Text>
                <Text>📅</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Inspector *</Text>
              <View
                style={[
                  styles.pickerContainer,
                  errors.inspector && styles.inputError,
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter inspector name"
                  value={formData.inspector}
                  onChangeText={text => handleInputChange('inspector', text)}
                />
              </View>
              {errors.inspector && (
                <Text style={styles.errorText}>{errors.inspector}</Text>
              )}
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.pickerContainer}>
                <TextInput
                  style={styles.input}
                  value={formData.status}
                  onChangeText={text => handleInputChange('status', text)}
                  placeholder="Enter status"
                />
              </View>
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Priority</Text>
              <View style={styles.pickerContainer}>
                <TextInput
                  style={styles.input}
                  value={formData.priority}
                  onChangeText={text => handleInputChange('priority', text)}
                  placeholder="Enter priority"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Property Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Details</Text>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Room Count</Text>
              <TextInput
                style={[styles.input, errors.roomCount && styles.inputError]}
                placeholder="0"
                keyboardType="numeric"
                value={formData.roomCount}
                onChangeText={text => handleInputChange('roomCount', text)}
              />
              {errors.roomCount && (
                <Text style={styles.errorText}>{errors.roomCount}</Text>
              )}
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Area (sq ft)</Text>
              <TextInput
                style={[styles.input, errors.area && styles.inputError]}
                placeholder="0"
                keyboardType="numeric"
                value={formData.area}
                onChangeText={text => handleInputChange('area', text)}
              />
              {errors.area && (
                <Text style={styles.errorText}>{errors.area}</Text>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Condition</Text>
            <View style={styles.pickerContainer}>
              <TextInput
                style={styles.input}
                value={formData.condition}
                onChangeText={text => handleInputChange('condition', text)}
                placeholder="Enter condition"
              />
            </View>
          </View>
        </View>

        {/* Media Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Media & Documents</Text>

          <View style={styles.mediaButtons}>
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => handleImagePick('camera')}
              disabled={loading}>
              <Text>📷</Text>
              <Text style={styles.mediaButtonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => handleImagePick('gallery')}
              disabled={loading}>
              <Text>🖼️</Text>
              <Text style={styles.mediaButtonText}>From Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the property and inspection requirements..."
              multiline
              numberOfLines={4}
              value={formData.description}
              onChangeText={text => handleInputChange('description', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Additional notes or observations..."
              multiline
              numberOfLines={3}
              value={formData.notes}
              onChangeText={text => handleInputChange('notes', text)}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            testID="reset-button"
            style={[styles.button, styles.resetButton]}
            onPress={handleReset}
            disabled={loading}>
            <Text>🔄</Text>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="submit-button"
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Text>💾</Text>
                <Text style={styles.submitButtonText}>Create Inspection</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PropertyInspectionForm;
